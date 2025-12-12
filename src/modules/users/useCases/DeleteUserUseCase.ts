import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(id);
  }
}
