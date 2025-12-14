import { Report } from '@prisma/client';

export interface ICreateReportDTO {
    userId?: string;
    type: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
    neighborhood?: string;
    delegacia?: string;
    mediaUrl?: string;
    mediaType?: string;
}

export interface IUpdateReportStatusDTO {
    id: string;
    status: string;
}

export interface IReportFilters {
    status?: string;
    type?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface IReportRepository {
    create(data: ICreateReportDTO): Promise<Report>;
    list(filters?: IReportFilters): Promise<ReportWithUser[]>;
    findById(id: string): Promise<Report | null>;
    updateStatus(data: IUpdateReportStatusDTO, userId?: string): Promise<Report>;
    findByUserId(userId: string): Promise<Report[]>;
    countResolvedToday(): Promise<number>;
}

export type ReportWithUser = Report & {
    user: {
        email: string;
    } | null;
};
