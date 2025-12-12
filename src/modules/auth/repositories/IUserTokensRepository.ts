import { UserToken } from '@prisma/client';

export interface IUserTokensRepository {
  create(userId: string, token: string, expiresIn: Date): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
  deleteById(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
