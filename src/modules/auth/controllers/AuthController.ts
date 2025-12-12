import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../useCases/RegisterUseCase';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUserUseCase';
import { RefreshTokenUseCase } from '../useCases/RefreshTokenUseCase';
import { LogoutUseCase } from '../useCases/LogoutUseCase';
import { SendForgotPasswordEmailUseCase } from '../useCases/SendForgotPasswordEmailUseCase';
import { ResetPasswordUseCase } from '../useCases/ResetPasswordUseCase';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

import { injectable, inject, container } from 'tsyringe';

@injectable()
export class AuthController {
  constructor(
    @inject(RegisterUseCase) private registerUseCase: RegisterUseCase,
    @inject(AuthenticateUserUseCase) private authenticateUserUseCase: AuthenticateUserUseCase,
    @inject(RefreshTokenUseCase) private refreshTokenUseCase: RefreshTokenUseCase,
    @inject(LogoutUseCase) private logoutUseCase: LogoutUseCase,
  ) { }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerSchema.parse(req.body);
      const user = await this.registerUseCase.execute(data);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);
      const result = await this.authenticateUserUseCase.execute(data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await this.refreshTokenUseCase.execute(refreshToken);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      await this.logoutUseCase.execute(refreshToken);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  sendForgotPasswordEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const sendForgotPasswordEmailUseCase = container.resolve(SendForgotPasswordEmailUseCase);
      await sendForgotPasswordEmailUseCase.execute(email);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, password } = req.body;
      const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
      await resetPasswordUseCase.execute(token, password);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
