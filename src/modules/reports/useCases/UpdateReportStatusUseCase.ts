import { inject, injectable } from 'tsyringe';
import { IReportRepository, IUpdateReportStatusDTO } from '../repositories/IReportRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class UpdateReportStatusUseCase {
    constructor(
        @inject('ReportRepository')
        private reportRepository: IReportRepository
    ) { }

    async execute({ id, status }: IUpdateReportStatusDTO, userId?: string) {
        const report = await this.reportRepository.findById(id);

        if (!report) {
            throw new AppError('Report not found', 404);
        }

        return this.reportRepository.updateStatus({ id, status }, userId);
    }
}
