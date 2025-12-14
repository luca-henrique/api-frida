import { Router } from 'express';
import { ReportController } from '../../../controllers/ReportController';
import { authMiddleware } from '../../../../../middlewares/auth';

const router = Router();
const reportController = new ReportController();

router.use(authMiddleware);

router.post('/', reportController.create);
router.get('/', reportController.list);
router.patch('/:id/status', reportController.updateStatus);

export default router;
