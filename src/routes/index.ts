import { Router } from 'express';
import authRoutes from './auth.routes';
import riskRoutes from './risk.routes';
import chatRoutes from './chat.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/risk', riskRoutes);
router.use('/chat', chatRoutes);

export default router;
