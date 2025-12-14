import { inject, injectable } from 'tsyringe';
import { IContactsRepository } from '../repositories/IContactsRepository';
import { Contact } from '@prisma/client';

@injectable()
export class ListContactsUseCase {
    constructor(
        @inject('ContactsRepository')
        private contactsRepository: IContactsRepository
    ) { }

    async execute(userId: string): Promise<Contact[]> {
        return this.contactsRepository.listByUserId(userId);
    }
}
