import express from 'express';
import { 
  getAdminStats, 
  createLottery, 
  drawLottery, 
  manageSlots,
  distributeDividends,
  getSystemTransactions 
} from '../controllers/admin';
import { adminAuthMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.use(adminAuthMiddleware);

router.get('/stats', getAdminStats);
router.post('/lottery', createLottery);
router.post('/lottery/:lotteryId/draw', drawLottery);
router.put('/slots/:slotId', manageSlots);
router.post('/dividends/distribute', distributeDividends);
router.get('/transactions', getSystemTransactions);

export default router;