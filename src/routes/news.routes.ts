import { Router } from 'express';
import { container } from 'tsyringe';
import { NewsController } from '../controllers/NewsController';

import { authMiddleware } from '../middlewares/auth';

const router = Router();
const newsController = container.resolve(NewsController);

router.get('/', newsController.index);
router.get('/:id', newsController.show);

router.post('/', authMiddleware, newsController.create);
router.put('/:id', authMiddleware, newsController.update);
router.delete('/:id', authMiddleware, newsController.delete);
router.patch('/:id/disable', authMiddleware, newsController.disable);

export default router;
