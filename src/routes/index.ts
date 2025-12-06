import { Router } from 'express';
import authRoutes from './auth.routes';
import riskRoutes from './risk.routes';
import chatRoutes from './chat.routes';
import newsRoutes from './news.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/risk', riskRoutes);
router.use('/chat', chatRoutes);
router.use('/news', newsRoutes);
router.use('/users', userRoutes);

export default router;
