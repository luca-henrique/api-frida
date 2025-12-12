import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository';
import { loginSchema } from '../schemas/auth.schema';

type LoginData = z.infer<typeof loginSchema>;

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) { }

  async execute({ email, password }: LoginData) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check Lockout
    if (user.lockoutUntil && dayjs().isBefore(dayjs(user.lockoutUntil))) {
      const minutes = dayjs(user.lockoutUntil).diff(dayjs(), 'minute') + 1;
      throw new AppError(`Account locked. Try again in ${minutes} minutes.`, 429);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      const MAX_ATTEMPTS = Number(process.env.MAX_LOGIN_ATTEMPTS) || 5;
      const LOCKOUT_DURATION_MINUTES = Number(process.env.LOCKOUT_DURATION_MINUTES) || 15;

      const failedLoginAttempts = user.failedLoginAttempts + 1;
      let lockoutUntil = user.lockoutUntil;

      if (failedLoginAttempts >= MAX_ATTEMPTS) {
        lockoutUntil = dayjs().add(LOCKOUT_DURATION_MINUTES, 'minute').toDate();
      }

      await this.userRepository.update(user.id, {
        failedLoginAttempts,
        lockoutUntil,
      });

      throw new AppError('Invalid credentials', 401);
    }

    // Reset Lockout if success
    if (user.failedLoginAttempts > 0 || user.lockoutUntil) {
      await this.userRepository.update(user.id, {
        failedLoginAttempts: 0,
        lockoutUntil: null,
      });
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any, // Short-lived access token
    });

    await this.refreshTokenRepository.deleteByUserId(user.id);

    const refreshTokenDays = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 1;
    const refreshTokenExpiresIn = dayjs().add(refreshTokenDays, 'day').unix();
    const refreshToken = await this.refreshTokenRepository.create(
      user.id,
      uuidv4(),
      refreshTokenExpiresIn,
    );

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token, refreshToken: refreshToken.token };
  }
}
