import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateQuestionUseCase } from '../useCases/CreateQuestionUseCase';
import { ListQuestionsUseCase } from '../useCases/ListQuestionsUseCase';
import { UpdateQuestionUseCase } from '../useCases/UpdateQuestionUseCase';
import { DeleteQuestionUseCase } from '../useCases/DeleteQuestionUseCase';
import {
    createQuestionSchema,
    listQuestionsSchema,
    updateQuestionSchema,
} from '../schemas/risk.schema';

export class RiskQuestionController {
    async index(req: Request, res: Response): Promise<Response> {
        const { page, limit, activeOnly } = listQuestionsSchema.parse(req.query);

        const listQuestionsUseCase = container.resolve(ListQuestionsUseCase);

        const result = await listQuestionsUseCase.execute(
            page,
            limit,
            activeOnly === 'true'
        );

        return res.json(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const data = createQuestionSchema.parse(req.body);

        const createQuestionUseCase = container.resolve(CreateQuestionUseCase);

        const question = await createQuestionUseCase.execute(data);

        return res.status(201).json(question);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data = updateQuestionSchema.parse(req.body);

        const updateQuestionUseCase = container.resolve(UpdateQuestionUseCase);

        const question = await updateQuestionUseCase.execute(id, data);

        return res.json(question);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteQuestionUseCase = container.resolve(DeleteQuestionUseCase);

        await deleteQuestionUseCase.execute(id);

        return res.status(204).send();
    }
}
