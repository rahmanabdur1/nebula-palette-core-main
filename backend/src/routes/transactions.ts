import express from 'express';
import { 
  getUserTransactions, 
  getTransactionByHash 
} from '../controllers/transactions';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/my-transactions', authMiddleware, getUserTransactions);
router.get('/:transactionHash', authMiddleware, getTransactionByHash);

export default router;