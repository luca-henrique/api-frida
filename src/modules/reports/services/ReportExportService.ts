import { injectable, inject } from 'tsyringe';
import { IReportRepository } from '../repositories/IReportRepository';
import { createObjectCsvStringifier } from 'csv-writer';

@injectable()
export class ReportExportService {
    constructor(
        @inject('ReportRepository')
        private reportRepository: IReportRepository
    ) { }

    async execute(): Promise<string> {
        const reports = await this.reportRepository.list();

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'id', title: 'ID' },
                { id: 'type', title: 'TYPE' },
                { id: 'status', title: 'STATUS' },
                { id: 'createdAt', title: 'CREATED_AT' },
                { id: 'userEmail', title: 'USER_EMAIL' },
                { id: 'address', title: 'ADDRESS' },
            ]
        });

        const records = reports.map(report => ({
            id: report.id,
            type: report.type,
            status: report.status,
            createdAt: report.createdAt.toISOString(),
            userEmail: report.user?.email || 'Anonymous',
            address: report.address || ''
        }));

        return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
    }
}
