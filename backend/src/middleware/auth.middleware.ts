import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { CustomError } from './error.middleware';

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new CustomError('No authentication token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    const user = await User.findById(decoded.id).select('-__v');
    if (!user) {
      throw new CustomError('User not found', 401);
    }

    if (!user.isActive) {
      throw new CustomError('Account is deactivated', 401);
    }

    req.user = user;
    next();
    
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new CustomError('Invalid authentication token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new CustomError('Token expired', 401));
    } else {
      next(error);
    }
  }
};

export const adminAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authMiddleware(req, res, () => {
      if (!req.user) {
        throw new CustomError('User not authenticated', 401);
      }

      const adminWallet = process.env.ADMIN_WALLET;
      if (!adminWallet) {
        throw new CustomError('Admin wallet not configured', 500);
      }

      const isAdmin = req.user.walletAddress.toLowerCase() === adminWallet.toLowerCase();
      
      if (!isAdmin) {
        throw new CustomError('Admin access required', 403);
      }
      
      next();
    });
  } catch (error) {
    next(error);
  }
};