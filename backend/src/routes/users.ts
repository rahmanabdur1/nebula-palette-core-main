import express from 'express';
import { 
  registerUser, 
  getUserProfile, 
  updateProfile, 
  getTeamDetails,
  getDashboardData 
} from '../controllers/users';
import { authMiddleware } from '../middleware/auth.middleware';
import { strictRateLimit } from '../middleware/rateLimit.middleware';
import { validateRegistration } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/register', strictRateLimit, validateRegistration, registerUser);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/team/:level', authMiddleware, getTeamDetails);
router.get('/dashboard', authMiddleware, getDashboardData);

export default router;