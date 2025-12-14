import { Router } from 'express';
import { LocationController } from '../../../controllers/LocationController';
import { authMiddleware } from '../../../../../middlewares/auth';
import { container } from 'tsyringe';

const locationRoutes = Router();
const locationController = new LocationController();

// All location routes require authentication
locationRoutes.use(authMiddleware);

locationRoutes.post('/', locationController.update);
locationRoutes.get('/', locationController.get);

export default locationRoutes;
