import { injectable, inject } from 'tsyringe';
import { RiskQuestionRepository } from '../repositories/RiskQuestionRepository';
import { AppError } from '../errors/AppError';

@injectable()
export class RiskQuestionService {
  constructor(@inject(RiskQuestionRepository) private questionRepository: RiskQuestionRepository) {}

  // Para o Dashboard (Admin)
  async create(data: { text: string; order: number }) {
    const questionWithSameOrder = await this.questionRepository.findByOrder(data.order);

    if (questionWithSameOrder) {
      throw new AppError('A question with this order already exists.');
    }

    return this.questionRepository.create(data);
  }

  // Para o Dashboard e App
  async list(activeOnly: boolean = false, page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit;

    const [questions, total] = await Promise.all([
      this.questionRepository.findAll(activeOnly, skip, take),
      this.questionRepository.count(activeOnly),
    ]);

    return {
      data: questions,
      meta: {
        total,
        page: page || 1,
        lastPage: limit ? Math.ceil(total / limit) : 1,
      },
    };
  }

  // Para o Dashboard
  async update(id: string, data: { text?: string; order?: number; active?: boolean }) {
    return this.questionRepository.update(id, data);
  }

  // Para o Dashboard
  async delete(id: string) {
    return this.questionRepository.delete(id);
  }
}
