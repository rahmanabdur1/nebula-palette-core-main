import express from 'express';
import { 
  getRoyaltyLevels, 
  getUserRoyaltyStatus, 
  getRoyaltyAchievers,
  claimRoyaltySalary 
} from '../controllers/royalty';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/levels', getRoyaltyLevels);
router.get('/my-status', authMiddleware, getUserRoyaltyStatus);
router.get('/achievers', getRoyaltyAchievers);
router.post('/claim-salary', authMiddleware, claimRoyaltySalary);

export default router;