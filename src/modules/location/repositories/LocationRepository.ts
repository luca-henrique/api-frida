import { Location } from '@prisma/client';
import prisma from '../../../config/database';
import { ILocationRepository, IUpdateLocationDTO } from './ILocationRepository';
import { injectable } from 'tsyringe';

@injectable()
export class LocationRepository implements ILocationRepository {
    async updateLocation({ userId, latitude, longitude }: IUpdateLocationDTO): Promise<Location> {
        return prisma.$transaction(async (tx) => {
            const location = await tx.location.upsert({
                where: { userId },
                update: {
                    latitude,
                    longitude,
                },
                create: {
                    userId,
                    latitude,
                    longitude,
                },
            });

            await tx.locationHistory.create({
                data: {
                    userId,
                    latitude,
                    longitude,
                },
            });

            return location;
        });
    }

    async findByUserId(userId: string): Promise<Location | null> {
        return prisma.location.findUnique({
            where: { userId },
        });
    }
}
