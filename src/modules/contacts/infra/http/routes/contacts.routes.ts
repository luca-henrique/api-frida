import { Router } from 'express';
import { ContactsController } from '../../../controllers/ContactsController';
import { authMiddleware } from '../../../../../middlewares/auth';

const contactsRoutes = Router();
const contactsController = new ContactsController();

contactsRoutes.use(authMiddleware);

contactsRoutes.post('/', contactsController.create);
contactsRoutes.get('/', contactsController.index);
contactsRoutes.delete('/:id', contactsController.delete);

export default contactsRoutes;
