import { Router } from 'express';
import { NewsController } from '../../../controllers/NewsController';
import { authMiddleware } from '../../../../../middlewares/auth';
import { adminMiddleware } from '../../../../../middlewares/admin.middleware';

const router = Router();
const newsController = new NewsController();

router.get('/', newsController.index);
router.get('/:id', newsController.show);

import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

const upload = multer(uploadConfig);

// ...

router.post('/', authMiddleware, adminMiddleware, upload.single('image'), newsController.create);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), newsController.update);
router.delete('/:id', authMiddleware, adminMiddleware, newsController.delete);
router.patch('/:id/disable', authMiddleware, adminMiddleware, newsController.disable);
router.get('/analytics/overview', authMiddleware, adminMiddleware, newsController.getAnalytics);

export default router;
