import { Router } from 'express';
import { RiskQuestionController } from '../../../controllers/RiskQuestionController';
import { RiskAssessmentController } from '../../../controllers/RiskAssessmentController';
import { authMiddleware } from '../../../../../middlewares/auth';
import { adminMiddleware } from '../../../../../middlewares/admin.middleware';

const riskRouter = Router();

const riskQuestionController = new RiskQuestionController();
const riskAssessmentController = new RiskAssessmentController();

// Risk Questions Routes (Protected by Admin Middleware)
riskRouter.post('/questions', authMiddleware, adminMiddleware, riskQuestionController.create);
riskRouter.get('/questions', riskQuestionController.index); // Public access allowed for listing
riskRouter.get('/questions/all', riskQuestionController.index);
riskRouter.put('/questions/:id', authMiddleware, adminMiddleware, riskQuestionController.update);
riskRouter.delete('/questions/:id', authMiddleware, adminMiddleware, riskQuestionController.delete);

// Risk Assessment Routes
riskRouter.get('/dashboard', authMiddleware, adminMiddleware, riskAssessmentController.getDashboard);
riskRouter.get('/analytics', authMiddleware, adminMiddleware, riskAssessmentController.getAnalytics);
riskRouter.post('/', authMiddleware, riskAssessmentController.create);
riskRouter.get('/', authMiddleware, riskAssessmentController.list);
riskRouter.get('/latest', authMiddleware, riskAssessmentController.showLatest);

export default riskRouter;
