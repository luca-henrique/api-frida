import { Router } from 'express';
import authRoutes from './auth.routes';
import riskRoutes from './risk.routes';
import chatRoutes from './chat.routes';
import newsRoutes from './news.routes';
import userRoutes from './user.routes';

import reportRoutes from './report.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/risk', riskRoutes);
router.use('/chat', chatRoutes);
router.use('/reports', reportRoutes);

export default router;
