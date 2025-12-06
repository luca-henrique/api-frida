import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = container.resolve(AuthController);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

export default router;
