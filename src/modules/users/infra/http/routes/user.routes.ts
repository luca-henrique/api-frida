import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../../../controllers/UserController';
import { authMiddleware } from '../../../../../middlewares/auth';

const router = Router();
const userController = container.resolve(UserController);

router.use(authMiddleware);

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
