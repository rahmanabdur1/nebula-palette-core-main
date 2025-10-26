// Commission distribution constants
export const COMMISSION_DISTRIBUTION = {
  ADMIN: 20,
  UPLINE_1: 40,
  UPLINE_2: 10,
  UPLINE_3: 5,
  UPLINE_4: 5,
  UPLINE_5: 5,
  SALARY_FUND: 10,
  DIVIDEND_FUND: 5
};

// Slot configuration
export const SLOT_CONFIG = {
  SILVER: {
    price: 100,
    usersRequired: 2,
    earnings: 10,
    level: 1
  },
  GOLD: {
    price: 200,
    usersRequired: 4,
    earnings: 25,
    level: 2
  },
  DIAMOND: {
    price: 500,
    usersRequired: 8,
    earnings: 75,
    level: 3
  },
  PLATINUM: {
    price: 1000,
    usersRequired: 16,
    earnings: 200,
    level: 4
  },
  RUBY: {
    price: 2000,
    usersRequired: 32,
    earnings: 500,
    level: 5
  }
};

// Royalty levels
export const ROYALTY_LEVELS = [
  {
    level: 1,
    salaryPercentage: 10,
    matrixRequired: 5,
    globalRequired: 5,
    directPartnersRequired: 20,
    totalTeamRequired: 100,
    salaryAmount: 1000
  },
  {
    level: 2,
    salaryPercentage: 20,
    matrixRequired: 10,
    globalRequired: 10,
    directPartnersRequired: 30,
    totalTeamRequired: 300,
    salaryAmount: 2500
  },
  {
    level: 3,
    salaryPercentage: 30,
    matrixRequired: 15,
    globalRequired: 15,
    directPartnersRequired: 40,
    totalTeamRequired: 600,
    salaryAmount: 5000
  },
  {
    level: 4,
    salaryPercentage: 40,
    matrixRequired: 20,
    globalRequired: 20,
    directPartnersRequired: 60,
    totalTeamRequired: 1000,
    salaryAmount: 10000
  }
];

// Lottery types
export const LOTTERY_TYPES = {
  DAILY: {
    ticketPrice: 1,
    drawInterval: 24 * 60 * 60 * 1000, // 24 hours
    maxTickets: 1000
  },
  WEEKLY: {
    ticketPrice: 5,
    drawInterval: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxTickets: 5000
  },
  JACKPOT: {
    ticketPrice: 10,
    drawInterval: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxTickets: 10000
  }
};

// Transaction types
export const TRANSACTION_TYPES = {
  REGISTRATION: 'registration',
  SLOT_ACTIVATION: 'slot_activation',
  DIVIDEND_CLAIM: 'dividend_claim',
  ROYALTY_SALARY: 'royalty_salary',
  LOTTERY_PURCHASE: 'lottery_purchase',
  LOTTERY_WIN: 'lottery_win',
  COMMISSION: 'commission'
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_WALLET: 'Invalid wallet address',
  USER_EXISTS: 'User already exists',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  SLOT_NOT_ACTIVE: 'Slot is not active',
  SLOT_ALREADY_ACTIVE: 'Slot already activated',
  NO_DIVIDENDS: 'No dividends available for claim',
  LOTTERY_NOT_ACTIVE: 'Lottery is not active',
  MAX_TICKETS: 'Maximum ticket limit exceeded'
};

// Success messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  SLOT_ACTIVATED: 'Slot activated successfully',
  DIVIDEND_CLAIMED: 'Dividend claimed successfully',
  LOTTERY_TICKETS_PURCHASED: 'Lottery tickets purchased successfully',
  ROYALTY_CLAIMED: 'Royalty salary claimed successfully'
};