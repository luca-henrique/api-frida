import { News } from '@prisma/client';
import prisma from '../../../config/database';
import { ICreateNewsDTO, INewsRepository, IUpdateNewsDTO } from './INewsRepository';

export class NewsRepository implements INewsRepository {
  async create(data: ICreateNewsDTO): Promise<News> {
    return prisma.news.create({
      data,
    });
  }

  async update(id: string, data: IUpdateNewsDTO): Promise<News> {
    return prisma.news.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<News | null> {
    return prisma.news.findUnique({
      where: { id },
    });
  }

  async list(page: number, limit: number, category?: string, search?: string): Promise<{ data: News[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: any = { active: true };

    if (category && category !== 'Todos') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Default: Show updated news first, but respect publishAt? 
    // Usually ordered by publishAt descending
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          publishAt: 'desc',
        },
      }),
      prisma.news.count({ where }),
    ]);

    return { data: news, total };
  }

  async incrementViews(id: string): Promise<void> {
    await prisma.news.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.news.delete({
      where: { id },
    });
  }

  async disable(id: string): Promise<News> {
    return prisma.news.update({
      where: { id },
      data: { active: false },
    });
  }
}
