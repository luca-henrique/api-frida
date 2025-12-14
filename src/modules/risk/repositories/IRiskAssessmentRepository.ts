import { RiskAssessment } from '@prisma/client';

export interface ICreateAssessmentData {
    userId: string;
    score: number;
    riskLevel: string;
    answers: { questionId: string; value: number }[];
}

export interface IUpdateAssessmentData {
    score: number;
    riskLevel: string;
    answers: { questionId: string; value: number }[];
}

export interface IRiskAssessmentRepository {
    create(data: ICreateAssessmentData): Promise<RiskAssessment>;
    findManyByUserId(userId: string): Promise<RiskAssessment[]>;
    findLatestByUserId(userId: string): Promise<RiskAssessment | null>;
    update(id: string, data: IUpdateAssessmentData): Promise<RiskAssessment>;
    countAssessmentsToday(): Promise<number>;
    countByRiskLevel(): Promise<{ riskLevel: string; count: number }[]>;
}
