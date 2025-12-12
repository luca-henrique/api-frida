import { Prisma, User, Role } from '@prisma/client';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmailOrCpf(email: string, cpf: string): Promise<User | null>;
  findAll(skip: number, take: number, role?: Role, type?: 'COMMON' | 'SYSTEM'): Promise<User[]>;
  count(role?: Role, type?: 'COMMON' | 'SYSTEM'): Promise<number>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<User>;
}
