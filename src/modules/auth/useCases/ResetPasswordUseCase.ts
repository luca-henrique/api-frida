import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository,
  ) { }

  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    const user = await this.userRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User not found');
    }

    if (dayjs().isAfter(dayjs(userToken.expiresIn))) {
      throw new AppError('Token expired');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.userRepository.update(user.id, {
      password: passwordHash,
    });

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
