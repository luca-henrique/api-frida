import { injectable } from 'tsyringe';
import prisma from '../../../config/database';
import { Contact } from '@prisma/client';
import { IContactsRepository } from './IContactsRepository';
import { ICreateContactDTO } from '../dtos/ICreateContactDTO';

@injectable()
export class ContactsRepository implements IContactsRepository {
    async create({ userId, name, number, relation }: ICreateContactDTO): Promise<Contact> {
        return prisma.contact.create({
            data: {
                userId,
                name,
                number,
                relation,
            },
        });
    }

    async listByUserId(userId: string): Promise<Contact[]> {
        return prisma.contact.findMany({
            where: { userId },
            orderBy: { name: 'asc' },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.contact.delete({
            where: { id },
        });
    }

    async findById(id: string): Promise<Contact | null> {
        return prisma.contact.findUnique({
            where: { id },
        });
    }
}
