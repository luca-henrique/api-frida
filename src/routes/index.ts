import { Router } from 'express';
import authRoutes from '../modules/auth/infra/http/routes/auth.routes';
import riskRoutes from '../modules/risk/infra/http/routes/risk.routes';
import chatRoutes from '../modules/chat/infra/http/routes/chat.routes';
import newsRoutes from '../modules/news/infra/http/routes/news.routes';
import userRoutes from '../modules/users/infra/http/routes/user.routes';
import locationRoutes from '../modules/location/infra/http/routes/location.routes';
import contactsRoutes from '../modules/contacts/infra/http/routes/contacts.routes';
import reportRoutes from '../modules/reports/infra/http/routes/report.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/risk', riskRoutes);
router.use('/chat', chatRoutes);
router.use('/reports', reportRoutes);
router.use('/location', locationRoutes);
router.use('/contacts', contactsRoutes);

export default router;
