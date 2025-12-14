import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateLocationUseCase } from '../useCases/UpdateLocationUseCase';
import { GetLocationUseCase } from '../useCases/GetLocationUseCase';
import { updateLocationSchema } from '../schemas/location.schema';

export class LocationController {
    async update(request: Request, response: Response): Promise<Response> {
        const { userId } = request;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const validation = updateLocationSchema.safeParse(request.body);

        if (!validation.success) {
            return response.status(400).json({ error: validation.error.format() });
        }

        const { latitude, longitude } = validation.data;

        const updateLocation = container.resolve(UpdateLocationUseCase);

        await updateLocation.execute({
            userId: userId as string,
            latitude,
            longitude,
        });

        return response.status(201).send();
    }

    async get(request: Request, response: Response): Promise<Response> {
        const { userId } = request;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const getLocation = container.resolve(GetLocationUseCase);
        const location = await getLocation.execute(userId as string);

        return response.json(location);
    }
}
