import { inject, injectable } from 'tsyringe';
import { ICreateReportDTO, IReportRepository } from '../repositories/IReportRepository';

import { ReverseGeocodingService } from '../../shared/services/ReverseGeocodingService';
import { NotificationService } from '../../shared/services/NotificationService';

@injectable()
export class CreateReportUseCase {
    constructor(
        @inject('ReportRepository')
        private reportRepository: IReportRepository,
        @inject('ReverseGeocodingService')
        private reverseGeocodingService: ReverseGeocodingService,
        @inject('NotificationService')
        private notificationService: NotificationService
    ) { }

    async execute(data: ICreateReportDTO) {
        if (data.latitude && data.longitude && !data.address) {
            const addressInfo = await this.reverseGeocodingService.getAddress(data.latitude, data.longitude);
            if (addressInfo) {
                data.address = addressInfo.address;
                data.city = addressInfo.city;
                data.neighborhood = addressInfo.neighborhood;
            }
        }

        const report = await this.reportRepository.create(data);

        if (data.type === 'EMERGENCY') {
            await this.notificationService.notifyAdmins(`Emergency report created! ID: ${report.id}`);
        }

        return report;
    }
}
