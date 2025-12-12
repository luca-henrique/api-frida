import { injectable } from 'tsyringe';
import prisma from '../../../config/database';
import { UserToken } from '@prisma/client';

import { IUserTokensRepository } from './IUserTokensRepository';

@injectable()
export class UserTokensRepository implements IUserTokensRepository {
  async create(userId: string, token: string, expiresIn: Date): Promise<UserToken> {
    return prisma.userToken.create({
      data: {
        userId,
        token,
        expiresIn,
      },
    });
  }

  async findByToken(token: string): Promise<UserToken | null> {
    return prisma.userToken.findUnique({
      where: { token },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.userToken.deleteMany({
      where: { userId },
    });
  }
}
