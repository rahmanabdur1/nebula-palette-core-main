import { Router } from 'express';
import userRoutes from './users';
import slotRoutes from './slots';
import dividendRoutes from './dividends';
import royaltyRoutes from './royalty';
import lotteryRoutes from './lottery';
import adminRoutes from './admin';
import transactionRoutes from './transactions';

const router = Router();

router.use('/users', userRoutes);
router.use('/slots', slotRoutes);
router.use('/dividends', dividendRoutes);
router.use('/royalty', royaltyRoutes);
router.use('/lottery', lotteryRoutes);
router.use('/admin', adminRoutes);
router.use('/transactions', transactionRoutes);

export default router;