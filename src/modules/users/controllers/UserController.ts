import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';
import { ListUsersUseCase } from '../useCases/ListUsersUseCase';
import { ShowUserUseCase } from '../useCases/ShowUserUseCase';
import { UpdateUserUseCase } from '../useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase';

export class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10, role, type } = req.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const result = await listUsersUseCase.execute(
      Number(page),
      Number(limit),
      role as any,
      type as any
    );

    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUserUseCase = container.resolve(ShowUserUseCase);

    const user = await showUserUseCase.execute(id);

    return res.json(user);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, cpf, password, role } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      cpf,
      password,
      role,
    });

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute(id, data);

    return res.json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(id);

    return res.status(204).send();
  }
}
