import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';

import { createUserSchema } from '../schemas/user.schema';

import { ICreateUserDTO, IUserResponseDTO } from '../dtos/IUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute(data: ICreateUserDTO): Promise<IUserResponseDTO> {
    const validatedData = createUserSchema.parse(data);

    const existingUser = await this.userRepository.findByEmailOrCpf(
      validatedData.email,
      validatedData.cpf,
    );

    if (existingUser) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(validatedData.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    }); // Assuming prisma types match mostly, or we cast. For cleaner DTO usage we can map manually.

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
