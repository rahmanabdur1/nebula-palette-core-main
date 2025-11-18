// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FuturePro is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct User {
        address wallet;
        uint256 userId;
        uint256 referrerId;
        bool isActive;
        uint256 joinTime;
        uint256 directPartners;
        uint256 totalTeam;
        uint256 royaltyLevel;
        uint256 activeSlotsCount;
    }

    struct Slot {
        uint256 slotId;
        string name;
        uint256 price;
        uint256 usersRequired;
        bool isActive;
        uint256 activationCount;
        bool isGlobal;
    }

    struct DividendRecord {
        uint256 slotId;
        uint256 amount;
        uint256 claimTime;
        bool claimed;
    }

    struct RoyaltyLevel {
        uint256 level;
        uint256 salaryPercentage;
        uint256 matrixRequired;
        uint256 globalRequired;
        uint256 directPartnersRequired;
        uint256 totalTeamRequired;
        uint256 salaryAmount;
    }

    struct Lottery {
        uint256 lotteryId;
        string lotteryType;
        uint256 ticketPrice;
        uint256 prizePool;
        uint256 drawTime;
        bool isDrawn;
        address[] participants;
        address winner;
        uint256 ticketsSold;
    }

    IERC20 public usdtToken;
    address public adminWallet;
    address public salaryWallet;
    address public freeFundWallet;
    uint256 public registrationFee;
    uint256 public userIdCounter;

    mapping(address => User) public users;
    mapping(uint256 => address) public userIdToAddress;

    mapping(uint256 => Slot) public slots;
    uint256 public slotCounter;
    mapping(address => mapping(uint256 => bool)) public userSlotActivations;
    mapping(address => DividendRecord[]) public userDividends;

    mapping(uint256 => RoyaltyLevel) public royaltyLevels;

    mapping(uint256 => Lottery) public lotteries;
    uint256 public lotteryCounter;

    uint256 public constant BASIS = 10000;
    uint256 public adminShareBP = 1500; // 15%
    uint256 public up1ShareBP = 4000;   // 40%
    uint256 public up2ShareBP = 1000;   // 10%
    uint256 public up3ShareBP = 500;    // 5%
    uint256 public up4ShareBP = 500;    // 5%
    uint256 public up5ShareBP = 500;    // 5%
    uint256 public salaryShareBP = 1000;// 10%
    uint256 public freeFundShareBP = 1000; // 10%
    uint256 public constant MAX_UPLINE_DEPTH = 50;

    event UserRegistered(address indexed user, uint256 userId, uint256 referrerId);
    event RegistrationFeeUpdated(uint256 newFee);
    event SlotCreated(uint256 indexed slotId, string name, uint256 price, bool isGlobal);
    event SlotActivated(address indexed user, uint256 slotId, uint256 price);
    event DividendClaimed(address indexed user, uint256 slotId, uint256 amount);
    event RoyaltyLevelUpdated(uint256 level);
    event LotteryCreated(uint256 lotteryId, string lotteryType, uint256 ticketPrice, uint256 drawTime);
    event LotteryTicketPurchased(address indexed buyer, uint256 lotteryId, uint256 tickets);
    event LotteryDrawn(uint256 lotteryId, address winner, uint256 prize);
    event FundsDistributed(address indexed from, uint256 amount);

    constructor(
        address _usdtToken,
        address _adminWallet,
        address _salaryWallet,
        address _freeFundWallet,
        uint256 _registrationFee
    ) {
        require(_usdtToken != address(0), "USDT zero");
        require(_adminWallet != address(0), "admin zero");
        require(_salaryWallet != address(0), "salary zero");
        require(_freeFundWallet != address(0), "freeFund zero");

        usdtToken = IERC20(_usdtToken);
        adminWallet = _adminWallet;
        salaryWallet = _salaryWallet;
        freeFundWallet = _freeFundWallet;
        registrationFee = _registrationFee;

        uint256 rootId = 1;
        users[msg.sender] = User(msg.sender, rootId, 0, true, block.timestamp, 0, 0, 0, 0);
        userIdToAddress[rootId] = msg.sender;
        userIdCounter = 2;

        _createDefaultSlots();

        royaltyLevels[1] = RoyaltyLevel(1, 10, 5, 5, 20, 100, 0.05 ether);
        royaltyLevels[2] = RoyaltyLevel(2, 20, 10, 10, 30, 300, 0.15 ether);
        royaltyLevels[3] = RoyaltyLevel(3, 30, 15, 15, 40, 600, 0.3 ether);
        royaltyLevels[4] = RoyaltyLevel(4, 40, 20, 20, 60, 1000, 1 ether);
    }

    modifier onlyRegistered() {
        require(users[msg.sender].wallet != address(0), "Not registered");
        _;
    }

    function setRegistrationFee(uint256 _fee) external onlyOwner {
        registrationFee = _fee;
        emit RegistrationFeeUpdated(_fee);
    }

    function registerUser(uint256 referrerId) external payable whenNotPaused nonReentrant {
        require(users[msg.sender].wallet == address(0), "Already registered");
        require(msg.value == registrationFee, "Incorrect fee");

        if(referrerId == 0) referrerId = 1;
        require(referrerId > 0 && referrerId < userIdCounter, "Invalid referrer");

        uint256 newId = userIdCounter;
        users[msg.sender] = User(msg.sender, newId, referrerId, true, block.timestamp, 0, 0, 0, 0);
        userIdToAddress[newId] = msg.sender;
        userIdCounter++;

        address refAddr = userIdToAddress[referrerId];
        if(refAddr != address(0)) {
            users[refAddr].directPartners += 1;
            _updateTeamCounts(referrerId);
        }

        emit UserRegistered(msg.sender, newId, referrerId);

        _distributeRegistrationFee(msg.value);
    }

    function _updateTeamCounts(uint256 referrerId) internal {
        uint256 parentId = referrerId;
        for(uint256 i=0;i<MAX_UPLINE_DEPTH;i++){
            address parentAddr = userIdToAddress[parentId];
            if(parentAddr==address(0)) break;
            users[parentAddr].totalTeam += 1;
            uint256 nextParentId = users[parentAddr].referrerId;
            if(nextParentId==0) break;
            parentId = nextParentId;
        }
    }

    function _distributeRegistrationFee(uint256 amount) internal {
        if(amount==0) return;

        uint256 adminShare = (amount*adminShareBP)/BASIS;
        uint256 salaryShare = (amount*salaryShareBP)/BASIS;
        uint256 freeShare = (amount*freeFundShareBP)/BASIS;
        uint256 toUplines = amount-(adminShare+salaryShare+freeShare);

        if(adminShare>0) _safeTransferNative(adminWallet, adminShare);
        if(salaryShare>0) _safeTransferNative(salaryWallet, salaryShare);
        if(freeShare>0) _safeTransferNative(freeFundWallet, freeShare);
        if(toUplines>0) _safeTransferNative(freeFundWallet, toUplines);

        emit FundsDistributed(msg.sender, amount);
    }

    function _safeTransferNative(address to, uint256 amount) internal {
        if(amount==0) return;
        (bool sent, ) = payable(to).call{value: amount}("");
        require(sent, "Native transfer failed");
    }

    // -------- Slots ----------
    function _createSlot(string memory name, uint256 price, uint256 usersRequired, bool isGlobal) internal {
        uint256 id = slotCounter;
        slots[id] = Slot(id,name,price,usersRequired,true,0,isGlobal);
        slotCounter++;
        emit SlotCreated(id,name,price,isGlobal);
    }

    function _createDefaultSlots() internal {
        for(uint256 i=0;i<12;i++){
            uint256 price = 5 ether*(i+1);
            _createSlot(string.concat("Future Slot ", _toString(i+1)), price, 2**(i+1), false);
        }
        for(uint256 i=0;i<12;i++){
            uint256 price = 5 ether*(i+1);
            _createSlot(string.concat("Global Slot ", _toString(i+1)), price, 2**(i+1), true);
        }
    }

    function createLottery(string calldata ltype, uint256 ticketPrice, uint256 drawTime) external onlyOwner {
        require(ticketPrice>0,"Zero price");
        require(drawTime>block.timestamp,"Draw time past");

        uint256 lid = lotteryCounter;
        address[] memory parts;
        lotteries[lid] = Lottery(lid,ltype,ticketPrice,0,drawTime,false,parts,address(0),0);
        lotteryCounter++;
        emit LotteryCreated(lid,ltype,ticketPrice,drawTime);
    }

    function buyLotteryTickets(uint256 lotteryId, uint256 count) external payable whenNotPaused nonReentrant onlyRegistered {
        require(lotteryId<lotteryCounter,"Invalid lottery");
        require(count>0,"Zero tickets");

        Lottery storage l = lotteries[lotteryId];
        require(block.timestamp<l.drawTime,"Draw passed");
        uint256 total = l.ticketPrice*count;
        require(msg.value==total,"Incorrect BNB");

        for(uint256 i=0;i<count;i++) l.participants.push(msg.sender);
        l.prizePool += msg.value;
        l.ticketsSold += count;

        emit LotteryTicketPurchased(msg.sender,lotteryId,count);
    }

    function drawLottery(uint256 lotteryId) external onlyOwner {
        require(lotteryId<lotteryCounter,"Invalid lottery");
        Lottery storage l = lotteries[lotteryId];
        require(!l.isDrawn,"Already drawn");
        require(l.participants.length>0,"No participants");

        uint256 winnerIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % l.participants.length;
        address winner = l.participants[winnerIndex];
        l.winner = winner;
        l.isDrawn = true;

        if(l.prizePool>0) _safeTransferNative(winner,l.prizePool);
        emit LotteryDrawn(lotteryId,winner,l.prizePool);
    }

    function _toString(uint256 value) internal pure returns (string memory str){
        if(value==0) return "0";
        uint256 temp = value;
        uint256 digits;
        while(temp!=0){ digits++; temp/=10;}
        bytes memory buffer = new bytes(digits);
        while(value!=0){ digits--; buffer[digits]=bytes1(uint8(48+value%10)); value/=10;}
        str = string(buffer);
    }

    receive() external payable {}
}
