import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';

import { updateUserSchema } from '../schemas/user.schema';

import { IUpdateUserDTO, IUserResponseDTO } from '../dtos/IUserDTO';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, data: IUpdateUserDTO): Promise<IUserResponseDTO> {
    const validatedData = updateUserSchema.parse(data);

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (validatedData.password) {
      validatedData.password = await hash(validatedData.password as string, 10);
    }

    const updatedUser = await this.userRepository.update(id, validatedData);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      cpf: updatedUser.cpf,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
