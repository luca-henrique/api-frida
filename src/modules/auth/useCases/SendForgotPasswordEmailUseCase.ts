import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import { IMailProvider } from '../../../shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
export class SendForgotPasswordEmailUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserTokensRepository') private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider') private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = uuidv4();
    const expiresIn = new Date();
    const expiresInHours = Number(process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN_HOURS) || 3;
    expiresIn.setHours(expiresIn.getHours() + expiresInHours); // Default 3 hours expiration

    await this.userTokensRepository.create(user.id, token, expiresIn);

    await this.mailProvider.sendMail({
      to: email,
      subject: '[Frida App] Recuperação de Senha',
      body: `Olá ${user.name},\n\nRecebemos uma solicitação de recuperação de senha para sua conta.\n\nUse o token abaixo para redefinir sua senha:\n\n${token}\n\nSe não foi você, ignore este email.`,
    });
  }
}
