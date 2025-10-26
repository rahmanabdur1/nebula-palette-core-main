import { Request, Response, NextFunction } from 'express';
import Royalty from '../models/Royalty';
import User from '../models/User';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';

// Get Royalty Levels
export const getRoyaltyLevels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const royaltyLevels = await Royalty.find({ isActive: true }).sort({ level: 1 });

    res.json({
      success: true,
      data: {
        royaltyLevels: royaltyLevels.map(level => ({
          level: level.level,
          salary: `${level.salaryPercentage}%`,
          salaryAmount: level.salaryAmount,
          matrixRequired: level.matrixRequired,
          globalRequired: level.globalRequired,
          directPartner: level.directPartnersRequired,
          totalTeam: level.totalTeamRequired,
          achieversCount: level.achieversCount,
          description: level.description
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User Royalty Status
export const getUserRoyaltyStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new CustomError('Unauthorized', 401);
    }
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const royaltyLevels = await Royalty.find({ isActive: true }).sort({ level: 1 });
    
    const userProgress = royaltyLevels.map(level => {
      // Calculate user's current stats
      const matrixSlots = Object.values(user.slots).filter(Boolean).length;
      const globalSlots = 0; // This would come from global slot activations
      const directPartners = user.directPartners;
      const totalTeam = user.totalTeam;

      const requirements = {
        matrix: { required: level.matrixRequired, current: matrixSlots },
        global: { required: level.globalRequired, current: globalSlots },
        directPartners: { required: level.directPartnersRequired, current: directPartners },
        totalTeam: { required: level.totalTeamRequired, current: totalTeam }
      };

      const isAchieved = 
        matrixSlots >= level.matrixRequired &&
        globalSlots >= level.globalRequired &&
        directPartners >= level.directPartnersRequired &&
        totalTeam >= level.totalTeamRequired;

      const progress = {
        matrix: Math.min(100, (matrixSlots / level.matrixRequired) * 100),
        global: Math.min(100, (globalSlots / level.globalRequired) * 100),
        directPartners: Math.min(100, (directPartners / level.directPartnersRequired) * 100),
        totalTeam: Math.min(100, (totalTeam / level.totalTeamRequired) * 100)
      };

      const overallProgress = Object.values(progress).reduce((a, b) => a + b, 0) / 4;

      return {
        level: level.level,
        salary: `${level.salaryPercentage}%`,
        salaryAmount: level.salaryAmount,
        requirements,
        progress,
        overallProgress: Math.min(100, overallProgress),
        isAchieved,
        isCurrent: user.royaltyLevel === level.level
      };
    });

    const nextLevel = userProgress.find(p => !p.isAchieved && p.overallProgress > 0) || 
                     userProgress[userProgress.length - 1];

    res.json({
      success: true,
      data: {
        currentLevel: user.royaltyLevel,
        userProgress,
        nextLevel,
        countdown: {
          days: 15,
          hours: 6,
          minutes: 30,
          seconds: 45
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get Royalty Achievers
export const getRoyaltyAchievers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { level } = req.query;

    const query: Record<string, unknown> = { royaltyLevel: { $gt: 0 } };
    if (level) query.royaltyLevel = parseInt(level as string);

    const achievers = await User.find(query)
      .select('userId username royaltyLevel directPartners totalTeam joinDate')
      .sort({ royaltyLevel: -1, totalTeam: -1 })
      .limit(50);

    const royaltyLevels = await Royalty.find({ isActive: true });

    res.json({
      success: true,
      data: {
        achievers: achievers.map(achiever => {
          const levelInfo = royaltyLevels.find(l => l.level === achiever.royaltyLevel);
          return {
            user: `User${achiever.userId}`,
            username: achiever.username,
            salary: levelInfo ? `${levelInfo.salaryPercentage}%` : 'N/A',
            matrixGlobal: `${levelInfo?.matrixRequired || 0}+${levelInfo?.globalRequired || 0}`,
            directPartner: achiever.directPartners,
            totalTeam: achiever.totalTeam,
            level: achiever.royaltyLevel,
            joinDate: achiever.joinDate
          };
        }),
        summary: {
          totalAchievers: achievers.length,
          byLevel: royaltyLevels.map(level => ({
            level: level.level,
            count: achievers.filter(a => a.royaltyLevel === level.level).length
          }))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Claim Royalty Salary
export const claimRoyaltySalary = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      throw new CustomError('Unauthorized', 401);
    }
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    if (user.royaltyLevel === 0) {
      throw new CustomError('You are not eligible for royalty salary', 400);
    }

    const royaltyLevel = await Royalty.findOne({ level: user.royaltyLevel });
    if (!royaltyLevel) {
      throw new CustomError('Royalty level not found', 400);
    }

    // Check if user can claim (e.g., monthly claim)
    const lastClaim = user.lastDividendClaim;
    const now = new Date();
    const daysSinceLastClaim = lastClaim ? 
      Math.floor((now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60 * 24)) : 31;

    if (daysSinceLastClaim < 30) {
      throw new CustomError(`You can claim royalty salary in ${Math.ceil(30 - daysSinceLastClaim)} days`, 400);
    }

    // Calculate salary amount based on level and performance
    const performanceRatio = Math.min(1, user.totalTeam / royaltyLevel.totalTeamRequired);
    const salaryAmount = royaltyLevel.salaryAmount * performanceRatio;

    // Update user last claim time
    user.lastDividendClaim = now;
    user.totalProfit += salaryAmount;
    await user.save();

    res.json({
      success: true,
      message: 'Royalty salary claimed successfully',
      data: {
        amount: salaryAmount,
        level: user.royaltyLevel,
        nextClaim: new Date(now.setDate(now.getDate() + 30))
      }
    });
  } catch (error) {
    next(error);
  }
};