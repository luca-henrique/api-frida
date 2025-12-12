import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../errors/AppError';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async list(page: number, limit: number, role?: Role, type?: 'COMMON' | 'SYSTEM') {
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

  async show(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(data: any) {
    const existingUser = await this.userRepository.findByEmailOrCpf(data.email, data.cpf);

    if (existingUser) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, data: any) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, data);

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(id);
  }
}
