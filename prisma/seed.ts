import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Mock Users
    const user = await prisma.user.upsert({
        where: { email: 'maria@mock.com' },
        update: {},
        create: {
            id: 'user-123',
            name: 'Maria (Mock)',
            email: 'maria@mock.com',
            password: hashedPassword,
            cpf: '000.000.000-00',
        },
    });

    const specialist = await prisma.user.upsert({
        where: { email: 'claudia@mock.com' },
        update: {},
        create: {
            id: 'specialist-1',
            name: 'Dra. Cláudia (Mock)',
            email: 'claudia@mock.com',
            password: hashedPassword,
            cpf: '111.111.111-11',
        },
    });

    console.log({ user, specialist });

    // Create Mock Chat
    const chat = await prisma.chat.upsert({
        where: { id: 'chat-specialist-1' },
        update: {},
        create: {
            id: 'chat-specialist-1',
            users: {
                connect: [{ id: 'user-123' }, { id: 'specialist-1' }],
            },
        },
    });

    console.log({ chat });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
