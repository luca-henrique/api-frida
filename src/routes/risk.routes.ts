import { Router } from 'express';
import { RiskQuestionController } from '../modules/risk/controllers/RiskQuestionController';
import { RiskAssessmentController } from '../modules/risk/controllers/RiskAssessmentController';
import { authMiddleware as ensureAuthenticated } from '../middlewares/auth';

const riskRouter = Router();

const riskQuestionController = new RiskQuestionController();
const riskAssessmentController = new RiskAssessmentController();

import { adminMiddleware } from '../middlewares/admin.middleware';

// ... (imports)

// Risk Questions Routes (Protected by Admin Middleware)
riskRouter.post('/questions', ensureAuthenticated, adminMiddleware, riskQuestionController.create);
riskRouter.get('/questions', riskQuestionController.index); // Public access allowed for listing
riskRouter.get('/questions/all', riskQuestionController.index);
riskRouter.put('/questions/:id', ensureAuthenticated, adminMiddleware, riskQuestionController.update);
riskRouter.delete('/questions/:id', ensureAuthenticated, adminMiddleware, riskQuestionController.delete);

// Risk Assessment Routes
riskRouter.get('/analytics', ensureAuthenticated, adminMiddleware, riskAssessmentController.getAnalytics);
riskRouter.post('/', ensureAuthenticated, riskAssessmentController.create);
riskRouter.get('/', ensureAuthenticated, riskAssessmentController.list);
riskRouter.get('/latest', ensureAuthenticated, riskAssessmentController.showLatest);

export default riskRouter;
