import { Router } from 'express';
import { container } from 'tsyringe';
import { RiskAssessmentController } from '../controllers/RiskAssessmentController';
import { RiskQuestionController } from '../controllers/RiskQuestionController'; // Novo
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const riskController = container.resolve(RiskAssessmentController);
const questionController = container.resolve(RiskQuestionController); // Novo

import { optionalAuthMiddleware } from '../middlewares/optionalAuth';

router.get('/', optionalAuthMiddleware, riskController.list); // Histórico (Público se passar userId)
router.get('/questions/all', questionController.indexAll); // Lista todas (Público)

router.use(authMiddleware);

// Rotas do App (Usuária)
router.get('/questions', questionController.indexActive); // App baixa as perguntas
router.get('/latest', riskController.showLatest); // Retorna a última avaliação (respostas)
router.post('/', riskController.create); // Envia as respostas

// Rotas do Dashboard (Admin/Gov) - Idealmente restringir por Role
router.post('/questions', questionController.create);
router.put('/questions/:id', questionController.update);
router.delete('/questions/:id', questionController.delete);

export default router;
