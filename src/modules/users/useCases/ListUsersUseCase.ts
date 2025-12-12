import { injectable, inject } from 'tsyringe';
import { Role } from '@prisma/client';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute(page: number, limit: number, role?: Role, type?: 'COMMON' | 'SYSTEM') {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.userRepository.findAll(skip, limit, role, type),
      this.userRepository.count(role, type),
    ]);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userData } = user;
      return userData;
    });

    return {
      data: usersWithoutPassword,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
