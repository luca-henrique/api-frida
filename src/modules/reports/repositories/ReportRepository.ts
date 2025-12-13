import { Report } from '@prisma/client';
import prisma from '../../../config/database';
import { ICreateReportDTO, IReportRepository, IUpdateReportStatusDTO, ReportWithUser } from './IReportRepository';

export class ReportRepository implements IReportRepository {
    async create({ userId, type, description, latitude, longitude, address, city, neighborhood, delegacia, mediaUrl, mediaType }: ICreateReportDTO): Promise<Report> {
        return prisma.report.create({
            data: {
                userId,
                type,
                description,
                latitude,
                longitude,
                address,
                city,
                neighborhood,
                delegacia,
                mediaUrl,
                mediaType,
                status: 'PENDING',
            },
        });
    }

    async list(filters?: { status?: string; type?: string; startDate?: Date; endDate?: Date }): Promise<ReportWithUser[]> {
        const where: any = {};

        if (filters?.status) {
            where.status = filters.status;
        }

        if (filters?.type) {
            where.type = filters.type;
        }

        if (filters?.startDate || filters?.endDate) {
            where.createdAt = {};
            if (filters.startDate) where.createdAt.gte = filters.startDate;
            if (filters.endDate) where.createdAt.lte = filters.endDate;
        }

        return prisma.report.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
    }

    async findById(id: string): Promise<Report | null> {
        return prisma.report.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                statusHistory: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }

    async findByUserId(userId: string): Promise<Report[]> {
        return prisma.report.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async updateStatus({ id, status }: IUpdateReportStatusDTO, userId?: string): Promise<Report> {
        const currentReport = await prisma.report.findUnique({ where: { id } });

        const result = await prisma.$transaction(async (tx) => {
            const report = await tx.report.update({
                where: { id },
                data: { status },
            });

            if (currentReport && currentReport.status !== status) {
                await tx.reportStatusHistory.create({
                    data: {
                        reportId: id,
                        previousStatus: currentReport.status,
                        newStatus: status,
                        changedBy: userId,
                    },
                });
            }

            return report;
        });

        return result;
    }
}
