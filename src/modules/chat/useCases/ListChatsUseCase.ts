import { inject, injectable } from 'tsyringe';
import { IChatRepository } from '../repositories/IChatRepository';

@injectable()
export class ListChatsUseCase {
    constructor(
        @inject('ChatRepository')
        private chatRepository: IChatRepository
    ) { }

    async execute(userId: string) {
        return this.chatRepository.findManyByUserId(userId);
    }
}
