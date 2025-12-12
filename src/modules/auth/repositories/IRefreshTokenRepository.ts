import { RefreshToken } from '@prisma/client';

export interface IRefreshTokenRepository {
  create(userId: string, token: string, expiresIn: number): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  deleteByUserId(userId: string): Promise<void>;
  deleteByToken(token: string): Promise<void>;
}
