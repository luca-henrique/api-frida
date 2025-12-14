import { Contact } from '@prisma/client';
import { ICreateContactDTO } from '../dtos/ICreateContactDTO';

export interface IContactsRepository {
    create(data: ICreateContactDTO): Promise<Contact>;
    listByUserId(userId: string): Promise<Contact[]>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Contact | null>;
}
