import { Prisma, RiskQuestion } from '@prisma/client';

export interface IRiskQuestionRepository {
    create(data: Prisma.RiskQuestionCreateInput): Promise<RiskQuestion>;
    findAll(activeOnly?: boolean, skip?: number, take?: number): Promise<RiskQuestion[]>;
    findByOrder(order: number): Promise<RiskQuestion | null>;
    count(activeOnly?: boolean): Promise<number>;
    update(id: string, data: Prisma.RiskQuestionUpdateInput): Promise<RiskQuestion>;
    delete(id: string): Promise<RiskQuestion>;
}
