import { AppError } from '../errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ChatRepository } from '../repositories/ChatRepository';

@injectable()
export class ChatService {
  constructor(@inject(ChatRepository) private chatRepository: ChatRepository) {}

  async listChats(userId: string) {
    return this.chatRepository.findManyByUserId(userId);
  }

  async getChat(chatId: string, userId: string) {
    const chat = await this.chatRepository.findById(chatId);

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    const isParticipant = chat.users.some((u) => u.id === userId);
    if (!isParticipant) {
      throw new AppError('Access denied', 403);
    }

    return chat;
  }

  async createChat(userId: string, participantId: string) {
    if (userId === participantId) {
      throw new AppError('Cannot create chat with yourself');
    }

    const existingChat = await this.chatRepository.findExisting(userId, participantId);

    if (existingChat) {
      return existingChat;
    }

    return this.chatRepository.create(userId, participantId);
  }
}
