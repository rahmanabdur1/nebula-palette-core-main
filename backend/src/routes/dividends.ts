import express from 'express';
import { 
  claimDividend, 
  getUserDividends, 
  getDividendHistory 
} from '../controllers/dividends';
import { authMiddleware } from '../middleware/auth.middleware';
import { strictRateLimit } from '../middleware/rateLimit.middleware';

const router = express.Router();

router.post('/claim', authMiddleware, strictRateLimit, claimDividend);
router.get('/my-dividends', authMiddleware, getUserDividends);
router.get('/history', authMiddleware, getDividendHistory);

export default router;