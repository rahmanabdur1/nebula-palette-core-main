import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Lottery from '../models/Lottery';
import User from '../models/User';
import Transaction from '../models/Transaction';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';

// Get Active Lotteries
export const getActiveLotteries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    
    const activeLotteries = await Lottery.find({
      status: 'active',
      drawTime: { $gt: now },
      isDrawn: false
    }).sort({ drawTime: 1 });

    res.json({
      success: true,
      data: {
        lotteries: activeLotteries.map(lottery => {
          // Use the virtual properties
          const timeUntilDraw = lottery.timeUntilDraw;
          const isActive = lottery.isActive;
          
          return {
            lotteryId: lottery.lotteryId,
            lotteryType: lottery.lotteryType,
            ticketPrice: lottery.ticketPrice,
            prizePool: lottery.prizePool,
            drawTime: lottery.drawTime,
            ticketsSold: lottery.ticketsSold,
            maxTickets: lottery.maxTickets,
            timeUntilDraw,
            isActive
          };
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// Purchase Lottery Tickets
export const purchaseTickets = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!req.user || !req.user._id) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user._id;
    const { lotteryId, ticketCount } = req.body;

    if (!lotteryId || !ticketCount) {
      throw new CustomError('Lottery ID and ticket count are required', 400);
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const lottery = await Lottery.findOne({ lotteryId }).session(session);
    if (!lottery) {
      throw new CustomError('Lottery not found', 404);
    }

    if (lottery.status !== 'active') {
      throw new CustomError('Lottery is not active', 400);
    }

    if (lottery.isDrawn) {
      throw new CustomError('Lottery has already been drawn', 400);
    }

    if (lottery.drawTime <= new Date()) {
      throw new CustomError('Lottery draw time has passed', 400);
    }

    // Check ticket limits
    if (lottery.maxTickets && (lottery.ticketsSold + ticketCount) > lottery.maxTickets) {
      throw new CustomError('Not enough tickets available', 400);
    }

    const userTickets = lottery.participants.filter((p: { userId: mongoose.Types.ObjectId }) => 
      p.userId.toString() === userId.toString()
    ).length;

    if (userTickets + ticketCount > 100) {
      throw new CustomError('Maximum ticket purchase limit exceeded', 400);
    }

    const totalCost = lottery.ticketPrice * ticketCount;

    // Check user balance
    if (user.totalProfit < totalCost) {
      throw new CustomError('Insufficient balance', 400);
    }

    // Generate ticket numbers and add participants
    const newParticipants: Array<{
      userId: mongoose.Types.ObjectId;
      ticketNumber: string;
      purchaseTime: Date;
    }> = [];
    
    for (let i = 0; i < ticketCount; i++) {
      const ticketNumber = `TKT${lottery.lotteryId}_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`;
      newParticipants.push({
        userId: user._id as mongoose.Types.ObjectId,
        ticketNumber,
        purchaseTime: new Date()
      });
    }

    // Update lottery
    lottery.participants.push(...newParticipants);
    lottery.ticketsSold += ticketCount;
    lottery.prizePool += totalCost;
    await lottery.save({ session });

    // Create transaction record
    const transaction = new Transaction({
      userId: user._id,
      amount: totalCost,
      type: 'lottery_purchase',
      lotteryId: lottery.lotteryId,
      user: `User${user.userId}`,
      transactionHash: `lottery_${lottery.lotteryId}_${user._id}_${Date.now()}`,
      status: 'completed',
      gasFee: 0.002,
      currency: 'USDT',
      description: `Purchased ${ticketCount} lottery tickets for ${lottery.lotteryType} lottery`
    });

    await transaction.save({ session });

    // Update user balance
    user.totalProfit -= totalCost;
    await user.save({ session });

    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Lottery tickets purchased successfully',
      data: {
        lotteryId: lottery.lotteryId,
        ticketsPurchased: ticketCount,
        totalCost,
        ticketNumbers: newParticipants.map(p => p.ticketNumber),
        nextDraw: lottery.drawTime,
        yourTickets: userTickets + ticketCount
      }
    });

  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// Get Lottery Results
export const getLotteryResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const completedLotteries = await Lottery.find({
      isDrawn: true,
      status: 'completed'
    })
    .populate<{ winner: { userId: string; username: string } }>('winner', 'userId username')
    .sort({ drawTime: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

    const total = await Lottery.countDocuments({ isDrawn: true });

    res.json({
      success: true,
      data: {
        results: completedLotteries.map((lottery) => ({
          lotteryId: lottery.lotteryId,
          lotteryType: lottery.lotteryType,
          drawTime: lottery.drawTime,
          winner: lottery.winner ? {
            userId: lottery.winner.userId,
            username: lottery.winner.username
          } : null,
          winningTicket: lottery.winningTicket,
          prizePool: lottery.prizePool,
          ticketsSold: lottery.ticketsSold
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Lottery History
export const getUserLotteryHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user._id;

    const userLotteries = await Lottery.aggregate([
      {
        $match: {
          'participants.userId': new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project: {
          lotteryId: 1,
          lotteryType: 1,
          drawTime: 1,
          isDrawn: 1,
          winner: 1,
          winningTicket: 1,
          prizePool: 1,
          userTickets: {
            $filter: {
              input: '$participants',
              as: 'participant',
              cond: { $eq: ['$$participant.userId', new mongoose.Types.ObjectId(userId)] }
            }
          }
        }
      },
      {
        $sort: { drawTime: -1 }
      }
    ]);

    interface UserLotteryResult {
      lotteryId: number;
      lotteryType: string;
      drawTime: Date;
      userTickets: Array<{ userId: mongoose.Types.ObjectId; ticketNumber: string; purchaseTime: Date }>;
      isDrawn: boolean;
      winner: mongoose.Types.ObjectId | null;
      winningTicket: string | null;
      prizePool: number;
    }

    const history = userLotteries.map((lottery: UserLotteryResult) => ({
      lotteryId: lottery.lotteryId,
      lotteryType: lottery.lotteryType,
      drawTime: lottery.drawTime,
      ticketsPurchased: lottery.userTickets.length,
      isDrawn: lottery.isDrawn,
      isWinner: lottery.isDrawn && lottery.winner && 
                lottery.winner.toString() === userId.toString(),
      winningTicket: lottery.winningTicket,
      prizePool: lottery.prizePool
    }));

    res.json({
      success: true,
      data: {
        history,
        summary: {
          totalLotteries: history.length,
          totalTickets: history.reduce((sum, lottery) => sum + lottery.ticketsPurchased, 0),
          wins: history.filter(lottery => lottery.isWinner).length,
          totalSpent: history.reduce((sum, lottery) => {
            return sum + (lottery.ticketsPurchased * 1); // Assuming 1 USDT per ticket
          }, 0)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};