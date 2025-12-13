'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const tsyringe_1 = require('tsyringe');
const RiskAssessmentController_1 = require('../controllers/RiskAssessmentController');
const auth_1 = require('../middlewares/auth');
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(
  RiskAssessmentController_1.RiskAssessmentController
);
router.use(auth_1.authMiddleware);
router.post('/', controller.create);
router.get('/', controller.list);
exports.default = router;
