import { injectable } from 'tsyringe';
import prisma from '../../../config/database';
import { RefreshToken } from '@prisma/client';

import { IRefreshTokenRepository } from './IRefreshTokenRepository';

@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(userId: string, token: string, expiresIn: number): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresIn,
      },
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async deleteByToken(token: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: { token },
    });
  }
}
