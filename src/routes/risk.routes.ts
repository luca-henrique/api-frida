import { Router } from 'express';
import { RiskAssessmentController } from '../controllers/RiskAssessmentController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const controller = new RiskAssessmentController();

router.use(authMiddleware);

router.post('/', controller.create);
router.get('/', controller.list);

export default router;
