import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { web3, redis } from '../app';
import User, { IUser } from '../models/User';
import Transaction from '../models/Transaction';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';
import { generateJWT } from '../utils/helpers';

// User Registration
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { walletAddress, referrerId, username, email } = req.body;

    // Validate wallet address
    if (!web3.utils.isAddress(walletAddress)) {
      throw new CustomError('Invalid wallet address format', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { walletAddress: walletAddress.toLowerCase() },
        { username }
      ]
    }).session(session);

    if (existingUser) {
      throw new CustomError('User already registered with this wallet or username', 400);
    }

    // Validate referrer if provided
    let referrer: IUser | null = null;
    if (referrerId) {
      referrer = await User.findOne({ userId: referrerId }).session(session);
      if (!referrer) {
        throw new CustomError('Invalid referrer ID', 400);
      }
    }

    // Create new user
    const user = new User({
      walletAddress: walletAddress.toLowerCase(),
      username,
      email,
      referrerId: referrer?._id,
      joinDate: new Date()
    });

    await user.save({ session });

    // Create registration transaction
    const transaction = new Transaction({
      userId: user._id,
      amount: 0.01, // 0.01 BNB registration fee
      type: 'registration',
      user: `User${user.userId}`,
      transactionHash: `reg_${user._id.toString()}_${Date.now()}`,
      status: 'completed',
      gasFee: 0.001,
      currency: 'BNB',
      description: 'User registration fee'
    });

    await transaction.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Generate JWT token
    const token = generateJWT(user._id.toString());

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          userId: user.userId,
          username: user.username,
          walletAddress: user.walletAddress,
          joinDate: user.joinDate,
          referralLink: `${process.env.FRONTEND_URL}/register?ref=${user.userId}`
        },
        token
      }
    });

  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// Get User Profile
export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new CustomError('Unauthorized', 401);
    }
    
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate<{ referrerId: IUser }>('referrerId', 'username userId')
      .select('-__v -updatedAt');

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Get financial stats from Redis cache
    const cacheKey = `user:${userId.toString()}:stats`;
    let stats = await redis.get(cacheKey);
    
    if (!stats) {
      // Calculate real-time stats
      const transactions = await Transaction.find({ userId: user._id, status: 'completed' });
      const totalProfit = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      
      stats = JSON.stringify({
        totalProfit,
        dividedEarn: user.dividedEarn,
        directPartners: user.directPartners,
        totalTeam: user.totalTeam
      });
      
      await redis.setex(cacheKey, 300, stats); // Cache for 5 minutes
    }

    const financialStats = JSON.parse(stats);

    // Build referrer display string
    let refBy = 'N/A';
    if (user.referrerId && typeof user.referrerId === 'object' && 'userId' in user.referrerId) {
      refBy = `User${user.referrerId.userId}`;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.userId,
          wallet: user.walletAddress,
          username: user.username,
          joinedOn: user.joinDate,
          memberSince: user.joinDate,
          avatar: user.avatar,
          socialLinks: user.socialLinks,
          refBy,
          level: user.level,
          royaltyLevel: user.royaltyLevel,
          slots: user.slots
        },
        financial: financialStats,
        referralLink: `${process.env.FRONTEND_URL}/register?ref=${user.userId}`
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new CustomError('Unauthorized', 401);
    }

    const userId = req.user._id;
    const { username, avatar, socialLinks } = req.body;

    const updateData: Partial<IUser> = {};
    if (username) updateData.username = username;
    if (avatar) updateData.avatar = avatar;
    if (socialLinks) updateData.socialLinks = socialLinks;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v -updatedAt');

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Clear cache
    await redis.del(`user:${userId.toString()}:stats`);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Get Team Details
export const getTeamDetails = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new CustomError('Unauthorized', 401);
    }

    const userId = req.user._id;
    const { level } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Use const instead of let
    const teamQuery = { referrerId: userId };
    
    // For levels beyond direct referrals, implement recursive query logic here
    if (level && level !== '1') {
      // Placeholder for advanced team query logic
      console.log(`Fetching team for level ${level}`);
    }

    const teamMembers = await User.find(teamQuery)
      .select('userId username joinDate level directPartners totalTeam isActive')
      .sort({ joinDate: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(teamQuery);

    res.json({
      success: true,
      data: {
        teamMembers: teamMembers.map(member => ({
          member: `User${member.userId}`,
          level: 1, // Direct referrals are level 1
          teamSize: member.totalTeam,
          status: member.isActive ? 'Active' : 'Inactive',
          joinDate: member.joinDate
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

// Get User Dashboard Data
export const getDashboardData = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new CustomError('Unauthorized', 401);
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Get recent transactions
    const recentTransactions = await Transaction.find({ userId: user._id })
      .sort({ time: -1 })
      .limit(10)
      .select('amount type time status description');

    // Get slot activations
    const activeSlots = Object.entries(user.slots).filter(([_, isActive]) => isActive);

    res.json({
      success: true,
      data: {
        userInfo: {
          ID: user.userId,
          Wallet: user.walletAddress,
          Username: user.username,
          JoinedOn: user.joinDate,
          ReferralLink: `${process.env.FRONTEND_URL}/register?ref=${user.userId}`
        },
        financialOverview: {
          TotalProfit: user.totalProfit,
          Partner: user.directPartners,
          TotalTeam: user.totalTeam,
          DividedEarn: user.dividedEarn
        },
        activeSlots: activeSlots.map(([slotName]) => slotName.toUpperCase()),
        recentTransactions,
        royaltyLevel: user.royaltyLevel
      }
    });
  } catch (error) {
    next(error);
  }
};