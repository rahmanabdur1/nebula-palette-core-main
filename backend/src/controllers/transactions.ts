import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Transaction, { ITransaction } from '../models/Transaction';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';

// Type definitions
type TransactionType = 
  | 'registration' 
  | 'slot_activation' 
  | 'dividend_claim' 
  | 'royalty_salary' 
  | 'lottery_purchase' 
  | 'lottery_win' 
  | 'commission';

type TransactionStatus = 'pending' | 'completed' | 'failed';
type Currency = 'BNB' | 'USDT';

interface TransactionQueryFilters {
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
}

interface PaginationParams {
  page: number;
  limit: number;
}

interface TransactionQuery extends TransactionQueryFilters, PaginationParams {
  userId: mongoose.Types.ObjectId;
}

// Response interfaces
interface TransactionListItem {
  id: string;
  amount: number;
  type: TransactionType;
  slot?: number;
  lottery?: number;
  user: string;
  time: Date;
  trx: string;
  status: TransactionStatus;
  gasFee: number;
  currency: Currency;
  description: string;
}

interface TransactionDetail extends TransactionListItem {
  userDetails?: {
    userId: number;
    username: string;
    walletAddress: string;
  };
}

interface TransactionSummaryItem {
  type: TransactionType;
  totalAmount: number;
  count: number;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface TransactionsResponse {
  transactions: TransactionListItem[];
  summary: TransactionSummaryItem[];
  pagination: PaginationInfo;
}

// Interface for populated user data
interface PopulatedUserData {
  userId: number;
  username: string;
  walletAddress: string;
}

// Type for transaction with populated user
type TransactionWithUser = Omit<ITransaction, 'userId'> & {
  userId: PopulatedUserData;
  _id: mongoose.Types.ObjectId;
};

// Get User Transactions
export const getUserTransactions = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new CustomError('Unauthorized', 401);
    }

    // Convert string _id to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user._id.toString());
    
    const queryParams = {
      page: Math.max(1, parseInt(req.query.page as string) || 1),
      limit: Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20)),
      type: req.query.type as TransactionType,
      status: req.query.status as TransactionStatus,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string
    };

    const dbQuery: mongoose.FilterQuery<ITransaction> = { 
      userId: userId 
    };

    // Add optional filters
    if (queryParams.type) dbQuery.type = queryParams.type;
    if (queryParams.status) dbQuery.status = queryParams.status;
    
    // Date range filter
    if (queryParams.startDate || queryParams.endDate) {
      dbQuery.time = {};
      if (queryParams.startDate) dbQuery.time.$gte = new Date(queryParams.startDate);
      if (queryParams.endDate) dbQuery.time.$lte = new Date(queryParams.endDate);
    }

    const [transactions, total] = await Promise.all([
      Transaction.find(dbQuery)
        .sort({ time: -1 })
        .limit(queryParams.limit)
        .skip((queryParams.page - 1) * queryParams.limit)
        .exec(),
      Transaction.countDocuments(dbQuery)
    ]);

    const summary = await Transaction.aggregate<{ _id: TransactionType; totalAmount: number; count: number }>([
      { $match: dbQuery },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const transactionList: TransactionListItem[] = transactions.map((tx: ITransaction) => ({
      id: tx._id.toString(), // Convert ObjectId to string
      amount: tx.amount,
      type: tx.type as TransactionType,
      slot: tx.slotId,
      lottery: tx.lotteryId,
      user: tx.user,
      time: tx.time,
      trx: tx.transactionHash,
      status: tx.status as TransactionStatus,
      gasFee: tx.gasFee,
      currency: tx.currency as Currency,
      description: tx.description
    }));

    const summaryResponse: TransactionSummaryItem[] = summary.map(item => ({
      type: item._id,
      totalAmount: item.totalAmount,
      count: item.count
    }));

    const response: TransactionsResponse = {
      transactions: transactionList,
      summary: summaryResponse,
      pagination: {
        page: queryParams.page,
        limit: queryParams.limit,
        total,
        pages: Math.ceil(total / queryParams.limit)
      }
    };

    res.json({
      success: true,
      data: response
    });

  } catch (error) {
    next(error);
  }
};

// Get Transaction by Hash
export const getTransactionByHash = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { transactionHash } = req.params;

    if (typeof transactionHash !== 'string' || !transactionHash.trim()) {
      throw new CustomError('Valid transaction hash is required', 400);
    }

    // Use proper typing for populated transaction
    const transaction = await Transaction.findOne({ transactionHash })
      .populate<{ userId: PopulatedUserData }>('userId', 'userId username walletAddress')
      .exec() as mongoose.HydratedDocument<ITransaction> & { userId: PopulatedUserData };

    if (!transaction) {
      throw new CustomError('Transaction not found', 404);
    }

    // Create transaction detail with proper typing
    const transactionDetail: TransactionDetail = {
      id: transaction._id.toString(), // Convert ObjectId to string
      amount: transaction.amount,
      type: transaction.type as TransactionType,
      slot: transaction.slotId,
      lottery: transaction.lotteryId,
      user: transaction.user,
      time: transaction.time,
      trx: transaction.transactionHash,
      status: transaction.status as TransactionStatus,
      gasFee: transaction.gasFee,
      currency: transaction.currency as Currency,
      description: transaction.description
    };

    // Add user details if populated
    if (transaction.userId && transaction.userId.userId) {
      transactionDetail.userDetails = {
        userId: transaction.userId.userId,
        username: transaction.userId.username,
        walletAddress: transaction.userId.walletAddress
      };
    }

    res.json({
      success: true,
      data: {
        transaction: transactionDetail
      }
    });

  } catch (error) {
    next(error);
  }
};