// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract FutureProSpace is VRFConsumerBaseV2, Ownable, Pausable, ReentrancyGuard {

    // -------- Structs ----------
    struct User {
        address wallet;
        uint256 userId;
        string username;
        uint256 joinTime;
        uint256 referrerId;
        bool isActive;
        uint256 directPartners;
        uint256 totalTeam;
        uint256 totalProfit;
        uint256 dividedEarn;
        uint256 royaltyLevel;
        uint256 lastDividendClaim;
        uint256 activeSlotsCount;
    }

    struct Slot {
        uint256 slotId;
        string slotName;
        uint256 price;
        uint256 usersRequired;
        bool isActive;
        uint256 earnings;
        uint256 activationCount;
        bool isGlobal;
    }

    struct DividendItem {
        uint256 slotId;
        uint256 amount;
        uint256 claimTime;
        bool isClaimed;
        string dividendType;
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
        bool randomnessRequested;
        bool randomnessFulfilled;
        uint256 vrfRequestId;
    }

    struct Transaction {
        uint256 amount;
        string txType;
        uint256 slotId;
        uint256 timestamp;
        string trxHash;
    }

    // -------- State ----------
    uint256 public registrationFee = 0.01 ether;
    IERC20 public usdtToken;

    mapping(address => User) public users;
    mapping(uint256 => address) public userIdToAddress;
    mapping(uint256 => Slot) public slots;
    mapping(address => mapping(uint256 => bool)) public userSlotActivations;
    mapping(address => DividendItem[]) public userDividends;
    mapping(uint256 => RoyaltyLevel) public royaltyLevels;
    mapping(uint256 => Lottery) public lotteries;
    mapping(address => uint256) public userLotteryTickets;
    mapping(address => uint256) public entitlements;
    mapping(address => Transaction[]) public userTransactions;

    // Admin wallets
    address public adminWallet;
    address public salaryWallet;
    address public freeFundWallet;

    uint256 private _userIdCounter = 1;
    uint256 private _slotIdCounter = 0;
    uint256 private _lotteryIdCounter = 0;

    // Chainlink VRF
    VRFCoordinatorV2Interface public vrfCoordinator;
    bytes32 public vrfKeyHash;
    uint64 public vrfSubscriptionId;
    uint32 public vrfCallbackGasLimit = 200000;
    uint16 public vrfRequestConfirmations = 3;

    // -------- Events ----------
    event UserRegistered(address indexed user, uint256 userId, uint256 referrerId);
    event RegistrationFeePaid(address indexed user, uint256 amount);
    event SlotCreated(uint256 indexed slotId, string name, uint256 price, bool isGlobal);
    event SlotActivated(address indexed user, uint256 slotId, uint256 price);
    event DividendAdded(address indexed user, uint256 slotId, uint256 amount, string dividendType);
    event DividendClaimed(address indexed user, uint256 amount);
    event EntitlementAdded(address indexed user, uint256 amount, string reason);
    event EntitlementClaimed(address indexed user, uint256 amount);
    event RoyaltyLevelUp(address indexed user, uint256 newLevel);
    event LotteryCreated(uint256 lotteryId, string lotteryType, uint256 ticketPrice, uint256 drawTime);
    event LotteryTicketPurchased(address indexed user, uint256 lotteryId, uint256 tickets, uint256 totalCost);
    event LotteryDrawRequested(uint256 lotteryId, uint256 requestId);
    event LotteryDrawn(uint256 lotteryId, address winner, uint256 prize);
    event CommissionDistributed(address indexed from, address indexed to, uint256 level, uint256 amount);
    event EmergencyWithdraw(address indexed to, uint256 amount);

    // -------- Constructor ----------
    constructor(
        address _vrfCoordinator,
        bytes32 _vrfKeyHash,
        uint64 _vrfSubscriptionId,
        address _usdtToken,
        address _adminWallet,
        address _salaryWallet,
        address _freeFundWallet
    ) VRFConsumerBaseV2(_vrfCoordinator) {
        vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        vrfKeyHash = _vrfKeyHash;
        vrfSubscriptionId = _vrfSubscriptionId;

        usdtToken = IERC20(_usdtToken);
        adminWallet = _adminWallet;
        salaryWallet = _salaryWallet;
        freeFundWallet = _freeFundWallet;

        _initializeSlots();
        _initializeRoyaltyLevels();
    }

    // -------- Modifiers ----------
    modifier onlyRegistered() {
        require(users[msg.sender].wallet != address(0), "Not registered");
        _;
    }

    // -------- Helpers ----------
    function _safeTransfer(address to, uint256 amount) internal returns (bool) {
        if (amount == 0) return true;
        (bool sent, ) = payable(to).call{value: amount}("");
        return sent;
    }

    function _recordTransaction(address user, uint256 amount, string memory txType, uint256 slotId) internal {
        userTransactions[user].push(Transaction(amount, txType, slotId, block.timestamp, ""));
    }

    function _createSlot(string memory name, uint256 price, uint256 usersRequired, uint256 earnings, bool isGlobal) internal {
        uint256 id = _slotIdCounter;
        slots[id] = Slot(id, name, price, usersRequired, true, earnings, 0, isGlobal);
        emit SlotCreated(id, name, price, isGlobal);
        _slotIdCounter++;
    }

    function _initializeSlots() internal {
        for (uint256 i = 0; i < 12; i++) {
            _createSlot(string.concat("Future Slot ", _toString(i+1)), 5 ether * (i+1), 2**(i+1), 0, false);
        }
        for (uint256 i = 0; i < 12; i++) {
            _createSlot(string.concat("Global Slot ", _toString(i+1)), 5 ether * (i+1), 2**(i+1), 0, true);
        }
    }

    function _initializeRoyaltyLevels() internal {
        royaltyLevels[1] = RoyaltyLevel(1, 10, 5, 5, 20, 100, 0.05 ether);
        royaltyLevels[2] = RoyaltyLevel(2, 20, 10, 10, 30, 300, 0.15 ether);
        royaltyLevels[3] = RoyaltyLevel(3, 30, 15, 15, 40, 600, 0.3 ether);
        royaltyLevels[4] = RoyaltyLevel(4, 40, 20, 20, 60, 1000, 1 ether);
    }

    // -------- Registration ----------
    function registerUser(uint256 referrerId, string calldata username) external payable whenNotPaused nonReentrant {
        require(msg.value == registrationFee, "Incorrect registration fee");
        require(users[msg.sender].wallet == address(0), "Already registered");
        require(bytes(username).length >= 3, "Username too short");

        uint256 uid = _userIdCounter;
        users[msg.sender] = User(
            msg.sender, uid, username, block.timestamp, referrerId,
            true, 0, 0, 0, 0, 0, 0, 0
        );
        userIdToAddress[uid] = msg.sender;
        _userIdCounter++;

        if (referrerId > 0) {
            address refAddr = userIdToAddress[referrerId];
            if (refAddr != address(0)) {
                users[refAddr].directPartners++;
                _updateTeamCount(refAddr);
            }
        }

        emit UserRegistered(msg.sender, uid, referrerId);
        emit RegistrationFeePaid(msg.sender, msg.value);

        _distributeCommission(msg.value, referrerId);
        _recordTransaction(msg.sender, msg.value, "Registration", 0);
    }

    // -------- Slot Activation (USDT) ----------
    function activateSlot(uint256 slotId) external whenNotPaused nonReentrant onlyRegistered {
        require(slotId < _slotIdCounter, "Invalid slotId");
        Slot storage s = slots[slotId];
        require(s.isActive, "Slot not active");
        require(!userSlotActivations[msg.sender][slotId], "Already activated");
        if(slotId > 0) require(userSlotActivations[msg.sender][slotId - 1], "Previous slot required");

        usdtToken.transferFrom(msg.sender, address(this), s.price);

        userSlotActivations[msg.sender][slotId] = true;
        s.activationCount++;
        users[msg.sender].activeSlotsCount++;

        if(s.earnings > 0) _addDividend(msg.sender, slotId, s.earnings, "slot");
        emit SlotActivated(msg.sender, slotId, s.price);
        _recordTransaction(msg.sender, s.price, "SlotActivation", slotId);

        _distributeCommission(s.price, users[msg.sender].referrerId);
        _checkRoyaltyUpgrade(msg.sender);
    }

    // -------- Admin Free Slot Activation ----------
    function adminActivateSlot(address userAddr, uint256 slotId) external onlyOwner {
        require(!userSlotActivations[userAddr][slotId], "Already activated");
        userSlotActivations[userAddr][slotId] = true;
        slots[slotId].activationCount++;
        users[userAddr].activeSlotsCount++;
        emit SlotActivated(userAddr, slotId, 0);
        _recordTransaction(userAddr, 0, "AdminFreeActivation", slotId);
    }

    // -------- Dividend & Entitlement ----------
    function _addDividend(address user, uint256 slotId, uint256 amount, string memory dividendType) internal {
        userDividends[user].push(DividendItem(slotId, amount, 0, false, dividendType));
        users[user].dividedEarn += amount;
        emit DividendAdded(user, slotId, amount, dividendType);
    }

    function claimDividend(uint256 index) external nonReentrant onlyRegistered {
        DividendItem storage d = userDividends[msg.sender][index];
        require(!d.isClaimed, "Already claimed");

        d.isClaimed = true;
        d.claimTime = block.timestamp;
        uint256 amount = d.amount;

        users[msg.sender].totalProfit += amount;
        users[msg.sender].dividedEarn = users[msg.sender].dividedEarn > amount ? users[msg.sender].dividedEarn - amount : 0;
        users[msg.sender].lastDividendClaim = block.timestamp;

        require(_safeTransfer(msg.sender, amount), "Transfer failed");
        emit DividendClaimed(msg.sender, amount);
        _recordTransaction(msg.sender, amount, "DividendClaim", d.slotId);
    }

    // -------- Commission Distribution ----------
    function _distributeCommission(uint256 amount, uint256 referrerId) internal {
        uint256 currentReferrerId = referrerId;
        address origin = msg.sender;

        uint256[5] memory commissionPercent = [uint256(40), 10, 5, 5, 5];

        for (uint256 i = 0; i < commissionPercent.length; i++) {
            if (currentReferrerId == 0) break;
            address upline = userIdToAddress[currentReferrerId];
            if (upline == address(0)) break;

            uint256 commission = (amount * commissionPercent[i]) / 100;

            if (commission > 0) {
                if (!_safeTransfer(upline, commission)) {
                    entitlements[upline] += commission;
                    emit EntitlementAdded(upline, commission, "CommissionFallback");
                } else {
                    users[upline].totalProfit += commission;
                    emit CommissionDistributed(origin, upline, i + 1, commission);
                }
            }

            currentReferrerId = users[upline].referrerId;
        }
    }

    // -------- Royalty Upgrade ----------
    function _checkRoyaltyUpgrade(address userAddr) internal {
        User storage u = users[userAddr];
        uint256 activated = u.activeSlotsCount;
        for(uint256 lvl=4; lvl>=1; lvl--){
            RoyaltyLevel memory rl = royaltyLevels[lvl];
            if(activated >= rl.matrixRequired &&
                u.directPartners >= rl.directPartnersRequired &&
                u.totalTeam >= rl.totalTeamRequired){
                    if(u.royaltyLevel<lvl){
                        u.royaltyLevel = lvl;
                        emit RoyaltyLevelUp(userAddr,lvl);
                    }
                    break;
            }
            if(lvl==1) break;
        }
    }

    // -------- Admin Utilities ----------
    function updateSlot(uint256 slotId, uint256 price, bool active, uint256 earnings) external onlyOwner {
        require(slotId < _slotIdCounter, "Invalid slot");
        slots[slotId].price = price;
        slots[slotId].isActive = active;
        slots[slotId].earnings = earnings;
    }

    function emergencyWithdraw(address to, uint256 amount) external onlyOwner {
        require(_safeTransfer(to,amount),"Withdraw failed");
        emit EmergencyWithdraw(to,amount);
    }

    // -------- Team Update ----------
    function _updateTeamCount(address userAddr) internal {
        address parent = userIdToAddress[users[userAddr].referrerId];
        while(parent!=address(0)){
            users[parent].totalTeam++;
            parent = userIdToAddress[users[parent].referrerId];
        }
    }

    function _toString(uint256 value) internal pure returns(string memory){
        if(value==0) return "0";
        uint256 temp=value;
        uint256 digits;
        while(temp!=0){digits++; temp/=10;}
        bytes memory buffer = new bytes(digits);
        while(value!=0){digits-=1; buffer[digits] = bytes1(uint8(48 + uint256(value%10))); value/=10;}
        return string(buffer);
    }

    // -------- Chainlink VRF Callback ----------
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 lotteryId = requestId;
        if(lotteryId < _lotteryIdCounter) {
            Lottery storage l = lotteries[lotteryId];
            if(l.participants.length > 0){
                uint256 winnerIndex = randomWords[0] % l.participants.length;
                l.winner = l.participants[winnerIndex];
                l.isDrawn = true;
                l.randomnessFulfilled = true;

                uint256 prize = l.prizePool;
                _safeTransfer(l.winner, prize);
                emit LotteryDrawn(lotteryId, l.winner, prize);
            }
        }
    }

    // -------- Receive & Fallback ----------
    receive() external payable {}
    fallback() external payable {}
}
