import { Location } from '@prisma/client';

export interface IUpdateLocationDTO {
    userId: string;
    latitude: number;
    longitude: number;
}

export interface ILocationRepository {
    updateLocation(data: IUpdateLocationDTO): Promise<Location>;
    findByUserId(userId: string): Promise<Location | null>;
}
