import { Router } from 'express';
import { NotificationsController } from '../../../controllers/NotificationsController';
import { authMiddleware } from '../../../../../middlewares/auth';

const notificationsRoutes = Router();
const notificationsController = new NotificationsController();

notificationsRoutes.use(authMiddleware);

notificationsRoutes.get('/', notificationsController.index);
notificationsRoutes.patch('/:id/read', notificationsController.markAsRead);

export default notificationsRoutes;
