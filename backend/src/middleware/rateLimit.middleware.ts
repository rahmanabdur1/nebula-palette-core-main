import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../app';

// General API rate limiting
export const rateLimitMiddleware = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rate_limit:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limit for sensitive operations
export const strictRateLimit = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'strict_rate_limit:'
  }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many sensitive operations from this IP, please try again later.'
  },
  standardHeaders: true
});

// Authentication rate limiting
export const authRateLimit = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'auth_rate_limit:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true
});

// Lottery purchase rate limiting
export const lotteryRateLimit = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'lottery_rate_limit:'
  }),
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 lottery purchases per minute
  message: {
    success: false,
    error: 'Too many lottery purchases, please slow down.'
  },
  standardHeaders: true
});