import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { redis } from '../app';
import Slot from '../models/Slot';
import User from '../models/User';
import Transaction from '../models/Transaction';
import { CustomError } from '../middleware/error.middleware';
import { AuthRequest } from '../types/express';

// Get All Slots
export const getAllSlots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slots = await Slot.find().sort({ level: 1 });

    interface SlotResponse {
        slotId: string;
        slotName: string;
        slotType: string;
        price: number;
        usersRequired: number;
        isActive: boolean;
        isCompleted: boolean;
        earnings: number;
        level: number;
        activationCount: number;
        totalEarnings: number;
    }

    interface GetAllSlotsResponse {
        success: boolean;
        data: {
            slots: SlotResponse[];
        };
    }

    res.json({
        success: true,
        data: {
            slots: slots.map((slot): SlotResponse => ({
                slotId: slot.slotId.toString(),
                slotName: slot.slotName,
                slotType: slot.slotType,
                price: slot.price,
                usersRequired: slot.usersRequired,
                isActive: slot.isActive,
                isCompleted: slot.isCompleted,
                earnings: slot.earnings,
                level: slot.level,
                activationCount: slot.activationCount,
                totalEarnings: slot.totalEarnings
            }))
        }
    });
  } catch (error) {
    next(error);
  }
};

// Activate Slot
export const activateSlot = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!req.user || !req.user.id) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user.id;
    const { slotId } = req.body;

    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const slot = await Slot.findOne({ slotId }).session(session);
    if (!slot) {
      throw new CustomError('Slot not found', 404);
    }

    if (!slot.isActive) {
      throw new CustomError('This slot is not currently active', 400);
    }

    // Check if user already has this slot activated
    const slotKey = slot.slotName.toLowerCase() as keyof typeof user.slots;
    if (user.slots[slotKey]) {
      throw new CustomError('Slot already activated', 400);
    }

    // Check previous slot requirement
    if (slot.level > 1) {
      const previousSlot = await Slot.findOne({ level: slot.level - 1 }).session(session);
      if (previousSlot) {
        const previousSlotKey = previousSlot.slotName.toLowerCase() as keyof typeof user.slots;
        if (!user.slots[previousSlotKey]) {
          throw new CustomError(`You must activate ${previousSlot.slotName} slot first`, 400);
        }
      }
    }

    // Update user slots
    user.slots[slotKey] = true;
    await user.save({ session });

    // Update slot activation count
    slot.activationCount += 1;
    await slot.save({ session });

    // Create transaction record
    const transaction = new Transaction({
      userId: user._id,
      amount: slot.price,
      type: 'slot_activation',
      slotId: slot.slotId,
      user: `User${user.userId}`,
      transactionHash: `slot_${slot.slotId}_${user._id}_${Date.now()}`,
      status: 'completed',
      gasFee: 0.002, // Estimated gas fee
      currency: 'USDT',
      description: `Activated ${slot.slotName} slot`
    });

    await transaction.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Clear user cache
    await redis.del(`user:${userId}:stats`);

    res.json({
      success: true,
      message: `${slot.slotName} slot activated successfully`,
      data: {
        slot: {
          slotId: slot.slotId,
          slotName: slot.slotName,
          activated: true
        },
        transaction: {
          amount: slot.price,
          type: 'slot_activation',
          status: 'completed'
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

// Get User Slots
export const getUserSlots = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.id) {
      throw new CustomError('User not authenticated', 401);
    }
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const allSlots = await Slot.find().sort({ level: 1 });
    const userSlots = allSlots.map(slot => {
      const slotKey = slot.slotName.toLowerCase() as keyof typeof user.slots;
      return {
        ...slot.toObject(),
        isActivated: user.slots[slotKey] || false,
        canActivate: slot.isActive && 
          (slot.level === 1 || 
           (allSlots.find(s => s.level === slot.level - 1) && 
            user.slots[allSlots.find(s => s.level === slot.level - 1)!.slotName.toLowerCase() as keyof typeof user.slots]))
      };
    });

    res.json({
      success: true,
      data: {
        slots: userSlots,
        summary: {
          totalSlots: allSlots.length,
          activatedSlots: Object.values(user.slots).filter(Boolean).length,
          totalInvestment: allSlots.reduce((sum: number, slot: { slotName: string; price: number; }) => {
            const slotKey = slot.slotName.toLowerCase() as keyof typeof user.slots;
            return sum + (user.slots[slotKey] ? slot.price : 0);
          }, 0)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get Slot Details
export const getSlotDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { slotId } = req.params;

    const slot = await Slot.findOne({ slotId });
    if (!slot) {
      throw new CustomError('Slot not found', 404);
    }

    // Get users who activated this slot
    const slotKey = slot.slotName.toLowerCase();
    const activatedUsers = await User.find({
      [`slots.${slotKey}`]: true
    })
    .select('userId username joinDate')
    .limit(50)
    .sort({ joinDate: -1 });

    res.json({
      success: true,
      data: {
        slot: {
          ...slot.toObject(),
          activatedUsers: activatedUsers.map(user => ({
            user: `User${user.userId}`,
            username: user.username,
            joinedOn: user.joinDate
          })),
          activationRate: (slot.activationCount / 1000) * 100 // Example calculation
        }
      }
    });
  } catch (error) {
    next(error);
  }
};