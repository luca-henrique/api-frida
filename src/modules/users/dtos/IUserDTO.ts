import { Role } from '@prisma/client';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password?: string;
  cpf: string;
  role?: Role;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  role?: Role;
}

export interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
