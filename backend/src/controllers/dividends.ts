import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { web3, redis } from '../app';
import Dividend from '../models/Dividend';
import User from '../models/User';
import Transaction from '../models/Transaction';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';

// Claim Dividend
export const claimDividend = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!req.user) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user.id;
    const { slotId } = req.body;

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Check if user has available dividends
    const availableDividends = await Dividend.find({
      userId: user._id,
      isClaimed: false,
      status: 'completed'
    }).session(session);

    if (availableDividends.length === 0) {
      throw new CustomError('No dividends available for claim', 400);
    }

    // Calculate total claimable amount
    const totalAmount = availableDividends.reduce((sum: number, dividend: typeof availableDividends[0]) => sum + dividend.amount, 0);

    // Update dividends as claimed
    await Dividend.updateMany(
      {
        userId: user._id,
        isClaimed: false,
        status: 'completed'
      },
      {
        $set: {
          isClaimed: true,
          claimTime: new Date()
        }
      }
    ).session(session);

    // Update user balance
    user.totalProfit += totalAmount;
    user.dividedEarn = Math.max(0, user.dividedEarn - totalAmount);
    user.lastDividendClaim = new Date();
    await user.save({ session });

    // Create transaction record
    const transaction = new Transaction({
      userId: user._id,
      amount: totalAmount,
      type: 'dividend_claim',
      slotId: slotId || null,
      user: `User${user.userId}`,
      transactionHash: `dividend_${user._id}_${Date.now()}`,
      status: 'completed',
      gasFee: 0.003, // Estimated gas fee
      currency: 'USDT',
      description: `Dividend claim from ${availableDividends.length} sources`
    });

    await transaction.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Clear cache
    await redis.del(`user:${userId}:stats`);

    res.json({
      success: true,
      message: 'Dividend claimed successfully',
      data: {
        amount: totalAmount,
        dividendsClaimed: availableDividends.length,
        transaction: {
          hash: transaction.transactionHash,
          gasFee: transaction.gasFee
        }
      }
    });

  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// Get User Dividends
export const getUserDividends = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;

    const query: Record<string, unknown> = { userId };
    if (status) query.status = status;

    const dividends = await Dividend.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Dividend.countDocuments(query);

    // Calculate summary
    const totalDividends = await Dividend.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalEarned: { $sum: '$amount' },
          totalClaimed: { 
            $sum: { 
              $cond: [{ $eq: ['$isClaimed', true] }, '$amount', 0] 
            } 
          },
          pendingAmount: {
            $sum: {
              $cond: [{ $eq: ['$isClaimed', false] }, '$amount', 0]
            }
          }
        }
      }
    ]);

    const summary = totalDividends[0] || {
      totalEarned: 0,
      totalClaimed: 0,
      pendingAmount: 0
    };

    res.json({
      success: true,
      data: {
        dividends: dividends.map(dividend => ({
          id: dividend._id,
          slotId: dividend.slotId,
          amount: dividend.amount,
          claimTime: dividend.claimTime,
          isClaimed: dividend.isClaimed,
          type: dividend.type,
          status: dividend.status,
          createdAt: dividend.createdAt
        })),
        summary,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get Dividend History
export const getDividendHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user.id;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    const history = await Dividend.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startDate },
          isClaimed: true
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$claimTime' },
            month: { $month: '$claimTime' },
            day: { $dayOfMonth: '$claimTime' }
          },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        history,
        period: `${days} days`,
        totalDays: history.length
      }
    });
  } catch (error) {
    next(error);
  }
};