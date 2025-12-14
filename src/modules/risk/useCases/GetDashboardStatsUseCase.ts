import { inject, injectable } from 'tsyringe';
import { IRiskAssessmentRepository } from '../repositories/IRiskAssessmentRepository';
import { IReportRepository } from '../../reports/repositories/IReportRepository';

interface DashboardStats {
    assessmentsToday: number;
    riskBreakdown: { riskLevel: string; count: number }[];
    resolvedCasesToday: number;
}

@injectable()
export class GetDashboardStatsUseCase {
    constructor(
        @inject('RiskAssessmentRepository')
        private riskAssessmentRepository: IRiskAssessmentRepository,
        @inject('ReportRepository')
        private reportRepository: IReportRepository
    ) { }

    async execute(): Promise<DashboardStats> {
        const [assessmentsToday, riskBreakdown, resolvedCasesToday] = await Promise.all([
            this.riskAssessmentRepository.countAssessmentsToday(),
            this.riskAssessmentRepository.countByRiskLevel(),
            this.reportRepository.countResolvedToday(),
        ]);

        return {
            assessmentsToday,
            riskBreakdown,
            resolvedCasesToday,
        };
    }
}
