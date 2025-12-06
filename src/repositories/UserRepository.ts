import { injectable } from 'tsyringe';
import prisma from '../config/database';
import { Prisma, User, Role } from '@prisma/client';

@injectable()
export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findByCpf(cpf: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { cpf } });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    async findByEmailOrCpf(email: string, cpf: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                OR: [{ email }, { cpf }],
            },
        });
    }

    async findAll(skip: number, take: number, role?: Role, type?: 'COMMON' | 'SYSTEM'): Promise<User[]> {
        let where: Prisma.UserWhereInput = {};

        if (role) {
            where = { role };
        } else if (type === 'COMMON') {
            where = { role: 'USER' };
        } else if (type === 'SYSTEM') {
            where = { role: { not: 'USER' } };
        }

        return prisma.user.findMany({
            skip,
            take,
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async count(role?: Role, type?: 'COMMON' | 'SYSTEM'): Promise<number> {
        let where: Prisma.UserWhereInput = {};

        if (role) {
            where = { role };
        } else if (type === 'COMMON') {
            where = { role: 'USER' };
        } else if (type === 'SYSTEM') {
            where = { role: { not: 'USER' } };
        }

        return prisma.user.count({ where });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<User> {
        return prisma.user.delete({
            where: { id },
        });
    }
}
