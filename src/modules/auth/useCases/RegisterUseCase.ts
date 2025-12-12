import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { registerSchema } from '../schemas/auth.schema';

type RegisterData = z.infer<typeof registerSchema>;

@injectable()
export class RegisterUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute(data: RegisterData) {
    const existingUser = await this.userRepository.findByEmailOrCpf(data.email, data.cpf);

    if (existingUser) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(data.password, 10);

    const { confirmPassword: _, ...userData } = data;

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const { password: _password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
