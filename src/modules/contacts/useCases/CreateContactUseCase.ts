import { inject, injectable } from 'tsyringe';
import { IContactsRepository } from '../repositories/IContactsRepository';
import { ICreateContactDTO } from '../dtos/ICreateContactDTO';
import { Contact } from '@prisma/client';
import { AppError } from '../../../errors/AppError';

@injectable()
export class CreateContactUseCase {
    constructor(
        @inject('ContactsRepository')
        private contactsRepository: IContactsRepository
    ) { }

    async execute({ userId, name, number, relation }: ICreateContactDTO): Promise<Contact> {
        const userContacts = await this.contactsRepository.listByUserId(userId);

        if (userContacts.length >= 5) {
            throw new AppError('You can only have up to 5 trusted contacts.');
        }

        return this.contactsRepository.create({
            userId,
            name,
            number,
            relation,
        });
    }
}
