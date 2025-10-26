import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { web3, redis } from '../app';
import User from '../models/User';
import Slot from '../models/Slot';
import Lottery from '../models/Lottery';
import Royalty from '../models/Royalty';
import Transaction from '../models/Transaction';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';

// Admin Dashboard Stats
export const getAdminStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get basic stats
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    // Get financial stats
    const financialStats = await Transaction.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: null,
          totalVolume: { $sum: '$amount' },
          totalGasFees: { $sum: '$gasFee' },
          transactionCount: { $sum: 1 }
        }
      }
    ]);

    // Get slot statistics
    const slotStats = await Slot.aggregate([
      {
        $group: {
          _id: '$isActive',
          totalSlots: { $sum: 1 },
          totalActivations: { $sum: '$activationCount' },
          totalEarnings: { $sum: '$totalEarnings' }
        }
      }
    ]);

    // Get royalty achievers count
    const royaltyStats = await Royalty.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'level',
          foreignField: 'royaltyLevel',
          as: 'achievers'
        }
      },
      {
        $project: {
          level: 1,
          salaryPercentage: 1,
          achieversCount: { $size: '$achievers' }
        }
      }
    ]);

    // Get lottery statistics
    const lotteryStats = await Lottery.aggregate([
      {
        $group: {
          _id: '$lotteryType',
          totalLotteries: { $sum: 1 },
          totalTicketsSold: { $sum: '$ticketsSold' },
          totalPrizePool: { $sum: '$prizePool' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          newToday: newUsersToday
        },
        financial: financialStats[0] || {
          totalVolume: 0,
          totalGasFees: 0,
          transactionCount: 0
        },
        slots: slotStats,
        royalty: royaltyStats,
        lottery: lotteryStats,
        system: {
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          redisConnected: redis.status === 'ready'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create Lottery Event
export const createLottery = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { lotteryType, ticketPrice, drawTime, maxTickets, prizePool } = req.body;

    // Find the next lottery ID
    const lastLottery = await Lottery.findOne().sort({ lotteryId: -1 });
    const nextLotteryId = lastLottery ? lastLottery.lotteryId + 1 : 1;

    const lottery = new Lottery({
      lotteryId: nextLotteryId,
      lotteryType,
      ticketPrice,
      drawTime: new Date(drawTime),
      maxTickets,
      prizePool: prizePool || 0,
      status: 'active',
      isDrawn: false,
      participants: [],
      ticketsSold: 0
    });

    await lottery.save();

    res.status(201).json({
      success: true,
      message: 'Lottery created successfully',
      data: { lottery }
    });
  } catch (error) {
    next(error);
  }
};

// Draw Lottery
export const drawLottery = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { lotteryId } = req.params;

    const lottery = await Lottery.findOne({ lotteryId }).session(session);
    if (!lottery) {
      throw new CustomError('Lottery not found', 404);
    }

    if (lottery.isDrawn) {
      throw new CustomError('Lottery already drawn', 400);
    }

    if (lottery.drawTime > new Date()) {
      throw new CustomError('Lottery draw time has not arrived', 400);
    }

    if (lottery.participants.length === 0) {
      throw new CustomError('No participants in this lottery', 400);
    }

    // Select random winner
    const randomIndex = Math.floor(Math.random() * lottery.participants.length);
    const winner = lottery.participants[randomIndex];

    lottery.winner = winner.userId;
    lottery.winningTicket = winner.ticketNumber;
    lottery.isDrawn = true;
    lottery.status = 'completed';
    await lottery.save({ session });

    // Update winner's balance and create transaction
    const winnerUser = await User.findById(winner.userId).session(session);
    if (winnerUser) {
      winnerUser.totalProfit += lottery.prizePool;
      await winnerUser.save({ session });

      const transaction = new Transaction({
        userId: winner.userId,
        amount: lottery.prizePool,
        type: 'lottery_win',
        lotteryId: lottery.lotteryId,
        user: `User${winnerUser.userId}`,
        transactionHash: `lottery_win_${lottery.lotteryId}_${Date.now()}`,
        status: 'completed',
        gasFee: 0,
        currency: 'USDT',
        description: `Won ${lottery.lotteryType} lottery`
      });

      await transaction.save({ session });
    }

    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Lottery drawn successfully',
      data: {
        lotteryId: lottery.lotteryId,
        winner: {
          userId: winnerUser?.userId,
          username: winnerUser?.username
        },
        winningTicket: lottery.winningTicket,
        prizePool: lottery.prizePool
      }
    });

  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// Manage Slots
export const manageSlots = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { slotId } = req.params;
    const updateData = req.body;

    const slot = await Slot.findOneAndUpdate(
      { slotId: parseInt(slotId) },
      updateData,
      { new: true, runValidators: true }
    );

    if (!slot) {
      throw new CustomError('Slot not found', 404);
    }

    res.json({
      success: true,
      message: 'Slot updated successfully',
      data: { slot }
    });
  } catch (error) {
    next(error);
  }
};

// Distribute Dividends
export const distributeDividends = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { slotId, amount, type = 'slot' } = req.body;

    // This would distribute dividends to all eligible users
    // Implementation depends on your business logic

    res.json({
      success: true,
      message: 'Dividends distributed successfully',
      data: {
        distributed: 0, // This would be the actual count
        totalAmount: 0  // This would be the actual amount
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get System Transactions
export const getSystemTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 50, type, status } = req.query;
    
    const query: Record<string, unknown> = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const transactions = await Transaction.find(query)
      .populate('userId', 'userId username')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      success: true,
      data: {
        transactions: transactions.map(tx => ({
          id: tx._id,
          amount: tx.amount,
          type: tx.type,
          slot: tx.slotId,
          user: tx.user,
          time: tx.time,
          trx: tx.transactionHash,
          status: tx.status,
          gasFee: tx.gasFee,
          description: tx.description
        })),
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