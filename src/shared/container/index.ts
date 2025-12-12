import { container } from 'tsyringe';

import { IMailProvider } from './providers/MailProvider/models/IMailProvider';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';

import { IUserRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

import { IRefreshTokenRepository } from '../../modules/auth/repositories/IRefreshTokenRepository';
import { RefreshTokenRepository } from '../../modules/auth/repositories/RefreshTokenRepository';

import { IUserTokensRepository } from '../../modules/auth/repositories/IUserTokensRepository';
import { UserTokensRepository } from '../../modules/auth/repositories/UserTokensRepository';

container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
