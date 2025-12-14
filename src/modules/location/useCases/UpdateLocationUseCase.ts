import { inject, injectable } from 'tsyringe';
import { ILocationRepository } from '../repositories/ILocationRepository';

interface IRequest {
    userId: string;
    latitude: number;
    longitude: number;
}

@injectable()
export class UpdateLocationUseCase {
    constructor(
        @inject('LocationRepository')
        private locationRepository: ILocationRepository
    ) { }

    async execute({ userId, latitude, longitude }: IRequest): Promise<void> {
        await this.locationRepository.updateLocation({
            userId,
            latitude,
            longitude,
        });
    }
}
