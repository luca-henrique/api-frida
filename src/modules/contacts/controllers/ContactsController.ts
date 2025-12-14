import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateContactUseCase } from '../useCases/CreateContactUseCase';
import { ListContactsUseCase } from '../useCases/ListContactsUseCase';
import { DeleteContactUseCase } from '../useCases/DeleteContactUseCase';
import { createContactSchema } from '../schemas/contact.schema';

export class ContactsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { userId } = request;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const validation = createContactSchema.safeParse(request.body);

        if (!validation.success) {
            return response.status(400).json({ error: validation.error.format() });
        }

        const { name, number, relation } = validation.data;

        const createContact = container.resolve(CreateContactUseCase);

        const contact = await createContact.execute({
            userId: userId as string,
            name,
            number,
            relation,
        });

        return response.status(201).json(contact);
    }

    async index(request: Request, response: Response): Promise<Response> {
        const { userId } = request;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const listContacts = container.resolve(ListContactsUseCase);
        const contacts = await listContacts.execute(userId as string);

        return response.json(contacts);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { userId } = request;
        const { id } = request.params;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const deleteContact = container.resolve(DeleteContactUseCase);
        await deleteContact.execute(userId as string, id);

        return response.status(204).send();
    }
}
