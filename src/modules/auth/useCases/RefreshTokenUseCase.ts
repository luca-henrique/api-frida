import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import dayjs from 'dayjs';

import { AppError } from '../../../errors/AppError';
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) { }

  async execute(token: string) {
    const refreshToken = await this.refreshTokenRepository.findByToken(token);

    if (!refreshToken) {
      throw new AppError('Refresh token invalid', 401);
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.deleteByUserId(refreshToken.userId);
      throw new AppError('Refresh token expired', 401);
    }

    const tokenNew = sign({ id: refreshToken.userId }, process.env.JWT_SECRET || 'secret', {
      expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any,
    });

    return { token: tokenNew };
  }
}
