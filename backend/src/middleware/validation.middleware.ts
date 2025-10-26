import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { CustomError } from './error.middleware';

// User registration validation
export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    walletAddress: Joi.string()
      .pattern(/^0x[a-fA-F0-9]{40}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid wallet address format',
        'any.required': 'Wallet address is required'
      }),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.alphanum': 'Username must contain only letters and numbers',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters',
        'any.required': 'Username is required'
      }),
    email: Joi.string()
      .email()
      .optional()
      .messages({
        'string.email': 'Invalid email format'
      }),
    referrerId: Joi.number()
      .integer()
      .min(10000)
      .optional()
      .messages({
        'number.base': 'Referrer ID must be a number',
        'number.min': 'Invalid referrer ID'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  next();
};

// Slot activation validation
export const validateSlotActivation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    slotId: Joi.number()
      .integer()
      .min(1)
      .required()
      .messages({
        'number.base': 'Slot ID must be a number',
        'any.required': 'Slot ID is required'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  next();
};

// Lottery purchase validation
export const validateLotteryPurchase = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    lotteryId: Joi.number()
      .integer()
      .min(1)
      .required()
      .messages({
        'number.base': 'Lottery ID must be a number',
        'any.required': 'Lottery ID is required'
      }),
    ticketCount: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .messages({
        'number.base': 'Ticket count must be a number',
        'number.min': 'Must purchase at least 1 ticket',
        'number.max': 'Cannot purchase more than 100 tickets at once',
        'any.required': 'Ticket count is required'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  next();
};

// Dividend claim validation
export const validateDividendClaim = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    slotId: Joi.number()
      .integer()
      .min(1)
      .optional()
      .messages({
        'number.base': 'Slot ID must be a number'
      })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  next();
};