import { News } from '@prisma/client';

export interface ICreateNewsDTO {
  title: string;
  category: string;
  content: string;
  imageUrl?: string;
  date: Date;
  publishAt?: Date;
}

export interface IUpdateNewsDTO {
  title?: string;
  category?: string;
  content?: string;
  imageUrl?: string;
  active?: boolean;
  publishAt?: Date;
}

export interface INewsRepository {
  create(data: ICreateNewsDTO): Promise<News>;
  update(id: string, data: IUpdateNewsDTO): Promise<News>;
  findById(id: string): Promise<News | null>;
  list(page: number, limit: number, category?: string, search?: string): Promise<{ data: News[]; total: number }>;
  incrementViews(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  disable(id: string): Promise<News>;
}
