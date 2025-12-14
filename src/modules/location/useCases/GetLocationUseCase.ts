import { inject, injectable } from 'tsyringe';
import { ILocationRepository } from '../repositories/ILocationRepository';
import { Location } from '@prisma/client';

@injectable()
export class GetLocationUseCase {
    constructor(
        @inject('LocationRepository')
        private locationRepository: ILocationRepository
    ) { }

    async execute(userId: string): Promise<Location | null> {
        return this.locationRepository.findByUserId(userId);
    }
}
