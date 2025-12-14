import { inject, injectable } from 'tsyringe';
import { IContactsRepository } from '../repositories/IContactsRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class DeleteContactUseCase {
    constructor(
        @inject('ContactsRepository')
        private contactsRepository: IContactsRepository
    ) { }

    async execute(userId: string, contactId: string): Promise<void> {
        const contact = await this.contactsRepository.findById(contactId);

        if (!contact) {
            throw new AppError('Contact not found', 404);
        }

        if (contact.userId !== userId) {
            throw new AppError('Operation not allowed', 403);
        }

        await this.contactsRepository.delete(contactId);
    }
}
