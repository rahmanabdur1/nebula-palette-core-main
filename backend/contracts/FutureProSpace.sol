// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FutureProSpace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    // Structs
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
        SlotInfo slots;
    }
    
    struct SlotInfo {
        bool silver;
        bool gold;
        bool diamond;
        bool platinum;
        bool ruby;
    }
    
    struct Slot {
        uint256 slotId;
        string slotName;
        uint256 price;
        uint256 usersRequired;
        bool isActive;
        bool isCompleted;
        uint256 earnings;
        uint256 activationCount;
        uint256 totalEarnings;
    }
    
    struct Dividend {
        uint256 slotId;
        uint256 amount;
        uint256 claimTime;
        bool isClaimed;
        string dividendType;
    }
    
    struct Royalty {
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
        string winningTicket;
        uint256 ticketsSold;
    }
    
    // State Variables
    Counters.Counter private _userIdCounter;
    Counters.Counter private _slotIdCounter;
    Counters.Counter private _lotteryIdCounter;
    
    mapping(address => User) public users;
    mapping(uint256 => address) public userIdToAddress;
    mapping(uint256 => Slot) public slots;
    mapping(address => mapping(uint256 => bool)) public userSlotActivations;
    mapping(address => Dividend[]) public userDividends;
    mapping(uint256 => Royalty) public royaltyLevels;
    mapping(uint256 => Lottery) public lotteries;
    mapping(address => uint256) public userLotteryTickets;
    
    uint256 public registrationFee = 0.01 ether;

    // Events
    event UserRegistered(address indexed user, uint256 userId, uint256 referrerId);
    event SlotActivated(address indexed user, uint256 slotId, uint256 price);
    event DividendClaimed(address indexed user, uint256 amount);
    event DividendDistributed(address indexed user, uint256 slotId, uint256 amount, string dividendType); // Fixed: Added event
    event RoyaltyLevelUp(address indexed user, uint256 newLevel);
    event LotteryTicketPurchased(address indexed user, uint256 lotteryId, uint256 tickets, uint256 totalCost);
    event LotteryDrawn(uint256 lotteryId, address winner, uint256 prize);
    event CommissionDistributed(address indexed user, address indexed upline, uint256 level, uint256 amount);
    
    constructor() Ownable(msg.sender) {
        _initializeSlots();
        _initializeRoyaltyLevels();
        _userIdCounter.increment(); // Start from 1
    }
    
    // Initialization functions
    function _initializeSlots() private {
        _createSlot("SILVER", 0.1 ether, 2, 0.01 ether);
        _createSlot("GOLD", 0.2 ether, 4, 0.025 ether);
        _createSlot("DIAMOND", 0.5 ether, 8, 0.075 ether);
        _createSlot("PLATINUM", 1 ether, 16, 0.2 ether);
        _createSlot("RUBY", 2 ether, 32, 0.5 ether);
    }
    
    function _initializeRoyaltyLevels() private {
        royaltyLevels[1] = Royalty(1, 10, 5, 5, 20, 100, 0.1 ether);
        royaltyLevels[2] = Royalty(2, 20, 10, 10, 30, 300, 0.25 ether);
        royaltyLevels[3] = Royalty(3, 30, 15, 15, 40, 600, 0.5 ether);
        royaltyLevels[4] = Royalty(4, 40, 20, 20, 60, 1000, 1 ether);
    }
    
    function _createSlot(string memory name, uint256 price, uint256 usersRequired, uint256 earnings) private {
        uint256 slotId = _slotIdCounter.current();
        slots[slotId] = Slot(slotId, name, price, usersRequired, true, false, earnings, 0, 0);
        _slotIdCounter.increment();
    }
    
    // User Registration
    function registerUser(uint256 referrerId, string memory username) external payable nonReentrant {
        require(msg.value == registrationFee, "Incorrect registration fee");
        require(users[msg.sender].wallet == address(0), "User already registered");
        require(bytes(username).length >= 3, "Username too short");
        require(referrerId == 0 || referrerId < _userIdCounter.current(), "Invalid referrer ID");
        
        uint256 userId = _userIdCounter.current();
        
        User storage newUser = users[msg.sender];
        newUser.wallet = msg.sender;
        newUser.userId = userId;
        newUser.username = username;
        newUser.joinTime = block.timestamp;
        newUser.referrerId = referrerId;
        newUser.isActive = true;
        
        userIdToAddress[userId] = msg.sender;
        _userIdCounter.increment();
        
        // Handle referral system
        if (referrerId > 0) {
            address referrer = userIdToAddress[referrerId];
            if (referrer != address(0)) {
                users[referrer].directPartners++;
                _updateTeamCount(referrer);
            }
        }
        
        emit UserRegistered(msg.sender, userId, referrerId);
        
        // Distribute registration commission
        _distributeCommission(msg.value, referrerId);
    }
    
    // Slot Activation
    function activateSlot(uint256 slotId) external payable nonReentrant {
        require(users[msg.sender].isActive, "User not active");
        require(slotId < _slotIdCounter.current(), "Invalid slot ID");
        
        Slot storage slot = slots[slotId];
        require(slot.isActive, "Slot not active");
        require(msg.value == slot.price, "Incorrect slot price");
        require(!userSlotActivations[msg.sender][slotId], "Slot already activated");
        
        // Check previous slot requirement
        if (slotId > 0) {
            require(userSlotActivations[msg.sender][slotId - 1], "Previous slot not activated");
        }
        
        userSlotActivations[msg.sender][slotId] = true;
        slot.activationCount++;
        slot.totalEarnings += slot.earnings;
        
        // Update user slot info
        if (keccak256(bytes(slot.slotName)) == keccak256(bytes("SILVER"))) {
            users[msg.sender].slots.silver = true;
        } else if (keccak256(bytes(slot.slotName)) == keccak256(bytes("GOLD"))) {
            users[msg.sender].slots.gold = true;
        } else if (keccak256(bytes(slot.slotName)) == keccak256(bytes("DIAMOND"))) {
            users[msg.sender].slots.diamond = true;
        } else if (keccak256(bytes(slot.slotName)) == keccak256(bytes("PLATINUM"))) {
            users[msg.sender].slots.platinum = true;
        } else if (keccak256(bytes(slot.slotName)) == keccak256(bytes("RUBY"))) {
            users[msg.sender].slots.ruby = true;
        }
        
        emit SlotActivated(msg.sender, slotId, msg.value);
        
        // Distribute slot activation commission
        _distributeCommission(msg.value, users[msg.sender].referrerId);
        
        // Add dividend for slot activation
        _addDividend(msg.sender, slotId, slot.earnings, "slot");
        
        // Check royalty level upgrade
        _checkRoyaltyUpgrade(msg.sender);
    }
    
    // Claim Dividends
    function claimDividend(uint256 dividendIndex) external nonReentrant {
        require(users[msg.sender].isActive, "User not active");
        require(dividendIndex < userDividends[msg.sender].length, "Invalid dividend index");
        
        Dividend storage dividend = userDividends[msg.sender][dividendIndex];
        require(!dividend.isClaimed, "Dividend already claimed");
        
        dividend.isClaimed = true;
        dividend.claimTime = block.timestamp;
        
        users[msg.sender].totalProfit += dividend.amount;
        users[msg.sender].dividedEarn = users[msg.sender].dividedEarn > dividend.amount ? 
            users[msg.sender].dividedEarn - dividend.amount : 0;
        users[msg.sender].lastDividendClaim = block.timestamp;
        
        payable(msg.sender).transfer(dividend.amount);
        
        emit DividendClaimed(msg.sender, dividend.amount);
    }
    
    // Claim All Dividends
    function claimAllDividends() external nonReentrant {
        require(users[msg.sender].isActive, "User not active");
        
        uint256 totalClaimable = 0;
        Dividend[] storage dividends = userDividends[msg.sender];
        
        for (uint256 i = 0; i < dividends.length; i++) {
            if (!dividends[i].isClaimed) {
                totalClaimable += dividends[i].amount;
                dividends[i].isClaimed = true;
                dividends[i].claimTime = block.timestamp;
            }
        }
        
        require(totalClaimable > 0, "No dividends available");
        
        users[msg.sender].totalProfit += totalClaimable;
        users[msg.sender].dividedEarn = 0;
        users[msg.sender].lastDividendClaim = block.timestamp;
        
        payable(msg.sender).transfer(totalClaimable);
        
        emit DividendClaimed(msg.sender, totalClaimable);
    }
    
    // Lottery Functions
    function purchaseLotteryTicket(uint256 lotteryId, uint256 ticketCount) external payable nonReentrant {
        require(users[msg.sender].isActive, "User not active");
        require(lotteryId < _lotteryIdCounter.current(), "Invalid lottery ID");
        
        Lottery storage lottery = lotteries[lotteryId];
        require(!lottery.isDrawn, "Lottery already drawn");
        require(block.timestamp < lottery.drawTime, "Lottery time expired");
        require(ticketCount > 0, "Must purchase at least one ticket");
        
        uint256 totalCost = lottery.ticketPrice * ticketCount;
        require(msg.value == totalCost, "Incorrect ticket cost");
        
        // Add participant multiple times for multiple tickets
        for (uint256 i = 0; i < ticketCount; i++) {
            lottery.participants.push(msg.sender);
        }
        
        lottery.ticketsSold += ticketCount;
        lottery.prizePool += totalCost;
        userLotteryTickets[msg.sender] += ticketCount;
        
        emit LotteryTicketPurchased(msg.sender, lotteryId, ticketCount, totalCost);
    }
    
    function drawLottery(uint256 lotteryId) external onlyOwner {
        require(lotteryId < _lotteryIdCounter.current(), "Invalid lottery ID");
        
        Lottery storage lottery = lotteries[lotteryId];
        require(!lottery.isDrawn, "Lottery already drawn");
        require(block.timestamp >= lottery.drawTime, "Draw time not reached");
        require(lottery.participants.length > 0, "No participants");
        
        // Simple random number generation (not secure for production - use Chainlink VRF for mainnet)
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(
            block.timestamp, 
            block.prevrandao, 
            lottery.participants.length
        ))) % lottery.participants.length;
        
        lottery.winner = lottery.participants[randomIndex];
        lottery.isDrawn = true;
        lottery.winningTicket = string(abi.encodePacked("WINNER_", _toString(randomIndex)));
        
        // Transfer prize to winner
        uint256 prizeAmount = lottery.prizePool;
        lottery.prizePool = 0; // Reset prize pool
        
        payable(lottery.winner).transfer(prizeAmount);
        
        // Update winner's stats
        users[lottery.winner].totalProfit += prizeAmount;
        
        emit LotteryDrawn(lotteryId, lottery.winner, prizeAmount);
    }
    
    // Admin Functions
    function createLottery(
        string memory lotteryType,
        uint256 ticketPrice,
        uint256 drawTime
    ) external onlyOwner {
        uint256 lotteryId = _lotteryIdCounter.current();
        
        lotteries[lotteryId] = Lottery({
            lotteryId: lotteryId,
            lotteryType: lotteryType,
            ticketPrice: ticketPrice,
            prizePool: 0,
            drawTime: drawTime,
            isDrawn: false,
            participants: new address[](0),
            winner: address(0),
            winningTicket: "",
            ticketsSold: 0
        });
        
        _lotteryIdCounter.increment();
    }
    
    function updateSlot(uint256 slotId, uint256 price, bool isActive) external onlyOwner {
        require(slotId < _slotIdCounter.current(), "Invalid slot ID");
        slots[slotId].price = price;
        slots[slotId].isActive = isActive;
    }
    
    function distributeRoyaltySalary() external onlyOwner {
        // Implementation for distributing royalty salaries to eligible users
        // This would iterate through users and distribute based on royalty level
    }
    
    // Internal Functions
    function _distributeCommission(uint256 amount, uint256 referrerId) private {
        uint256 currentReferrerId = referrerId;
        
        // Distribute to 5 uplines
        for (uint256 i = 1; i <= 5; i++) {
            if (currentReferrerId == 0) break;
            
            address upline = userIdToAddress[currentReferrerId];
            if (upline == address(0)) break;
            
            uint256 commissionPercentage;
            if (i == 1) commissionPercentage = 40;
            else if (i == 2) commissionPercentage = 10;
            else if (i == 3) commissionPercentage = 5;
            else if (i == 4) commissionPercentage = 5;
            else commissionPercentage = 5;
            
            uint256 commission = (amount * commissionPercentage) / 100;
            
            // Ensure contract has enough balance
            if (address(this).balance >= commission) {
                payable(upline).transfer(commission);
                users[upline].totalProfit += commission;
                emit CommissionDistributed(msg.sender, upline, i, commission);
            }
            
            // Move to next upline
            currentReferrerId = users[upline].referrerId;
        }
    }
    
    function _addDividend(address user, uint256 slotId, uint256 amount, string memory dividendType) private {
        userDividends[user].push(Dividend({
            slotId: slotId,
            amount: amount,
            claimTime: 0,
            isClaimed: false,
            dividendType: dividendType
        }));
        
        users[user].dividedEarn += amount;
        
        emit DividendDistributed(user, slotId, amount, dividendType);
    }
    
    function _updateTeamCount(address user) private {
        User storage userData = users[user];
        userData.totalTeam = userData.directPartners; // Simplified
        
        // Update upline team counts
        uint256 currentReferrerId = userData.referrerId;
        while (currentReferrerId > 0) {
            address upline = userIdToAddress[currentReferrerId];
            if (upline == address(0)) break;
            
            users[upline].totalTeam++;
            currentReferrerId = users[upline].referrerId;
        }
    }
    
    function _checkRoyaltyUpgrade(address user) private {
        User storage userData = users[user];
        uint256 activatedSlots = 0;
        
        if (userData.slots.silver) activatedSlots++;
        if (userData.slots.gold) activatedSlots++;
        if (userData.slots.diamond) activatedSlots++;
        if (userData.slots.platinum) activatedSlots++;
        if (userData.slots.ruby) activatedSlots++;
        
        for (uint256 i = 4; i >= 1; i--) {
            Royalty memory level = royaltyLevels[i];
            
            if (activatedSlots >= level.matrixRequired &&
                userData.directPartners >= level.directPartnersRequired &&
                userData.totalTeam >= level.totalTeamRequired) {
                
                if (userData.royaltyLevel < i) {
                    userData.royaltyLevel = i;
                    emit RoyaltyLevelUp(user, i);
                }
                break;
            }
        }
    }
    
    // Utility Functions
    function _toString(uint256 value) private pure returns (string memory) {
        if (value == 0) return "0";
        
        uint256 temp = value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }
    
    // View Functions
    function getUserInfo(address user) external view returns (User memory) {
        return users[user];
    }
    
    function getUserSlots(address user) external view returns (bool[5] memory) {
        User memory userData = users[user];
        return [
            userData.slots.silver,
            userData.slots.gold,
            userData.slots.diamond,
            userData.slots.platinum,
            userData.slots.ruby
        ];
    }
    
    function getAvailableDividends(address user) external view returns (uint256) {
        uint256 total = 0;
        Dividend[] memory dividends = userDividends[user];
        
        for (uint256 i = 0; i < dividends.length; i++) {
            if (!dividends[i].isClaimed) {
                total += dividends[i].amount;
            }
        }
        
        return total;
    }
    
    function getLotteryInfo(uint256 lotteryId) external view returns (Lottery memory) {
        require(lotteryId < _lotteryIdCounter.current(), "Invalid lottery ID");
        return lotteries[lotteryId];
    }
    
    function getSlotInfo(uint256 slotId) external view returns (Slot memory) {
        require(slotId < _slotIdCounter.current(), "Invalid slot ID");
        return slots[slotId];
    }
    
    function getUserDividends(address user) external view returns (Dividend[] memory) {
        return userDividends[user];
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function updateRegistrationFee(uint256 newFee) external onlyOwner {
        registrationFee = newFee;
    }
    
    // Function to check contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}