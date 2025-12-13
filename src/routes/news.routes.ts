import { Router } from 'express';
import { container } from 'tsyringe';
import { NewsController } from '../modules/news/controllers/NewsController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const newsController = new NewsController();

router.get('/', newsController.index);
router.get('/:id', newsController.show);

import multer from 'multer';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

// ...

router.post('/', authMiddleware, upload.single('image'), newsController.create);
router.put('/:id', authMiddleware, upload.single('image'), newsController.update);
router.delete('/:id', authMiddleware, newsController.delete);
router.patch('/:id/disable', authMiddleware, newsController.disable);
router.get('/analytics/overview', authMiddleware, newsController.getAnalytics);

export default router;
