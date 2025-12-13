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

container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository
);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
