import { container } from 'tsyringe';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IUserRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

import { IRefreshTokenRepository } from '../../modules/auth/repositories/IRefreshTokenRepository';
import { RefreshTokenRepository } from '../../modules/auth/repositories/RefreshTokenRepository';

import { IUserTokensRepository } from '../../modules/auth/repositories/IUserTokensRepository';
import { UserTokensRepository } from '../../modules/auth/repositories/UserTokensRepository';

import { IRiskQuestionRepository } from '../../modules/risk/repositories/IRiskQuestionRepository';
import { RiskQuestionRepository } from '../../modules/risk/repositories/RiskQuestionRepository';

import { IRiskAssessmentRepository } from '../../modules/risk/repositories/IRiskAssessmentRepository';
import { RiskAssessmentRepository } from '../../modules/risk/repositories/RiskAssessmentRepository';

import { INewsRepository } from '../../modules/news/repositories/INewsRepository';
import { NewsRepository } from '../../modules/news/repositories/NewsRepository';

import { IChatRepository } from '../../modules/chat/repositories/IChatRepository';
import { ChatRepository } from '../../modules/chat/repositories/ChatRepository';

import { IReportRepository } from '../../modules/reports/repositories/IReportRepository';
import { ReportRepository } from '../../modules/reports/repositories/ReportRepository';

container.registerSingleton<IRiskAssessmentRepository>(
  'RiskAssessmentRepository',
  RiskAssessmentRepository
);

container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository);
container.registerSingleton<IChatRepository>('ChatRepository', ChatRepository);
container.registerSingleton<IReportRepository>('ReportRepository', ReportRepository);

container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository
);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);

import { ReverseGeocodingService } from '../../modules/shared/services/ReverseGeocodingService';
container.registerSingleton<ReverseGeocodingService>('ReverseGeocodingService', ReverseGeocodingService);

import { ReportExportService } from '../../modules/reports/services/ReportExportService';
container.registerSingleton<ReportExportService>('ReportExportService', ReportExportService);

import { NotificationService } from '../../modules/shared/services/NotificationService';
container.registerSingleton<NotificationService>('NotificationService', NotificationService);
