import { Router } from 'express';
import { container } from 'tsyringe';
import { ChatController } from '../controllers/ChatController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const controller = container.resolve(ChatController);

router.use(authMiddleware);

router.get('/', controller.listChats);
router.post('/', controller.createChat);
router.get('/:id', controller.getChat);

export default router;
