import { Router } from 'express';
import { ChatController } from '../../../controllers/ChatController';
import { authMiddleware } from '../../../../../middlewares/auth';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

const router = Router();
const chatController = new ChatController();
const upload = multer(uploadConfig);

router.use(authMiddleware);

router.get('/', chatController.listChats);
router.post('/', chatController.createChat);
router.get('/:id', chatController.getChat);
router.post('/:chatId/messages', upload.single('file'), chatController.sendMessage);
router.patch('/:id/read', chatController.markAsRead);

export default router;
