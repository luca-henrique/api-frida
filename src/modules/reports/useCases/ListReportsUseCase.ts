import { inject, injectable } from 'tsyringe';
import { IReportFilters, IReportRepository } from '../repositories/IReportRepository';

@injectable()
export class ListReportsUseCase {
    constructor(
        @inject('ReportRepository')
        private reportRepository: IReportRepository
    ) { }

    async execute(filters?: IReportFilters) {
        return this.reportRepository.list(filters);
    }
}
