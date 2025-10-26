import express from 'express';
import { 
  getAllSlots, 
  activateSlot, 
  getUserSlots, 
  getSlotDetails 
} from '../controllers/slots';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllSlots);
router.get('/my-slots', authMiddleware, getUserSlots);
router.post('/activate', authMiddleware, activateSlot);
router.get('/:slotId', authMiddleware, getSlotDetails);

export default router;