import { injectable, inject } from 'tsyringe';
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.deleteByToken(refreshToken);
  }
}
