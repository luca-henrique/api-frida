import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../../../controllers/AuthController';

import { authLimiter } from '../../../../../middlewares/rateLimiter';

const router = Router();
const authController = container.resolve(AuthController);

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/password/forgot', authController.sendForgotPasswordEmail);
router.post('/password/reset', authController.resetPassword);

export default router;
