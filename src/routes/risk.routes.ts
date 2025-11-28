import { Router } from 'express';
import { container } from 'tsyringe';
import { RiskAssessmentController } from '../controllers/RiskAssessmentController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const controller = container.resolve(RiskAssessmentController);

router.use(authMiddleware);

router.post('/', controller.create);
router.get('/', controller.list);

export default router;
