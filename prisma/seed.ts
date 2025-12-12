import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const fridaQuestions = [
  { order: 1, text: 'A violência vem aumentando de gravidade e/ou de frequência no último mês?' },
  { order: 2, text: 'A senhora/você está grávida ou teve bebê nos últimos 18 meses?' },
  { order: 3, text: 'A senhora/você tem filhos(as) com o(a) agressor(a)?' },
  {
    order: 4,
    text: 'Em caso afirmativo, estão vivendo algum conflito com relação à guarda dos filhos, visitas ou pagamento de pensão pelo agressor?',
  },
  {
    order: 5,
    text: 'O(A) agressor(a) persegue a senhora/você, demonstra ciúme excessivo, tenta controlar sua vida e as coisas que você faz?',
  },
  {
    order: 6,
    text: 'A senhora/você se separou recentemente do(a) agressor(a), tentou ou tem intenção de se separar?',
  },
  {
    order: 7,
    text: 'O(A) agressor(a) também é violento com outras pessoas (familiares, amigos, colegas etc.)?',
  },
  { order: 8, text: 'O(A) agressor(a) maltrata ou agride animais domésticos?' },
  { order: 9, text: 'O(A) agressor(a) já a agrediu fisicamente outras vezes?' },
  {
    order: 10,
    text: 'Alguma vez o(a) agressor(a) tentou estrangular, sufocar ou afogar a senhora/você?',
  },
  { order: 11, text: 'O(A) agressor(a) já fez ameaças de morte ou tentou matar a senhora/você?' },
  {
    order: 12,
    text: 'O(A) agressor(a) já usou, ameaçou usar arma de fogo contra a senhora/você ou tem fácil acesso a uma arma?',
  },
  {
    order: 13,
    text: 'O(A) agressor(a) já a ameaçou ou feriu com outro tipo de arma ou instrumento?',
  },
  {
    order: 14,
    text: 'A senhora/você necessitou de atendimento médico e/ou internação após algumas dessas agressões?',
  },
  { order: 15, text: 'O(A) agressor(a) é usuário de drogas e/ou bebidas alcoólicas?' },
  {
    order: 16,
    text: 'O(A) agressor(a) faz uso de medicação controlada para alguma doença mental/psiquiátrica?',
  },
  { order: 17, text: 'A senhora/você já teve ou tem medida protetiva de urgência?' },
  {
    order: 18,
    text: 'O(A) agressor(a) já descumpriu medida protetiva de afastamento ou proibição de contato?',
  },
  { order: 19, text: 'O(A) agressor(a) já ameaçou ou tentou se matar alguma vez?' },
  // Nota: O PDF menciona 19 perguntas na tabela de pontuação [cite: 501], mas lista algumas extras como violência sexual ou financeira na página 32[cite: 505].
  // Adicionei as listadas na estrutura principal.
];

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  for (const q of fridaQuestions) {
    await prisma.riskQuestion.upsert({
      where: { id: `frida-q-${q.order}` }, // Usando ID determinístico para evitar duplicatas no seed
      update: { text: q.text, order: q.order },
      create: {
        id: `frida-q-${q.order}`,
        text: q.text,
        order: q.order,
        active: true,
      },
    });
  }

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

  // Create Support User
  await prisma.user.upsert({
    where: { email: 'suporte@frida.com' },
    update: {},
    create: {
      name: 'Suporte Frida',
      email: 'suporte@frida.com',
      password: hashedPassword,
      cpf: '000.000.000-01',
      role: 'SUPPORT',
    },
  });

  // Create Police User
  await prisma.user.upsert({
    where: { email: 'policia@frida.com' },
    update: {},
    create: {
      name: 'Polícia Militar',
      email: 'policia@frida.com',
      password: hashedPassword,
      cpf: '000.000.000-02',
      role: 'POLICE',
    },
  });

  // Create Firefighter User
  await prisma.user.upsert({
    where: { email: 'bombeiros@frida.com' },
    update: {},
    create: {
      name: 'Corpo de Bombeiros',
      email: 'bombeiros@frida.com',
      password: hashedPassword,
      cpf: '000.000.000-03',
      role: 'FIREFIGHTER',
    },
  });

  // Create Delegate User
  await prisma.user.upsert({
    where: { email: 'delegada@frida.com' },
    update: {},
    create: {
      name: 'Delegada Maria',
      email: 'delegada@frida.com',
      password: hashedPassword,
      cpf: '000.000.000-04',
      role: 'DELEGATE',
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

  // Create Mock News
  const newsData = [
    {
      id: '1',
      title: 'Nova Lei de Proteção à Mulher entra em vigor',
      date: new Date('2023-11-20'),
      category: 'Legislação',
      content: `Uma nova legislação que visa ampliar a proteção às mulheres vítimas de violência doméstica entrou em vigor hoje. A lei prevê penas mais rigorosas para agressores e agiliza a concessão de medidas protetivas.

Além disso, a nova lei estabelece a criação de centros de atendimento integral e multidisciplinar para mulheres e seus dependentes em situação de violência doméstica e familiar.

Especialistas afirmam que a medida é um avanço significativo na luta contra a violência de gênero e esperam que a implementação rigorosa da lei possa reduzir os índices de feminicídio no país.`,
    },
    {
      id: '2',
      title: 'Dicas de segurança pessoal no dia a dia',
      date: new Date('2023-11-18'),
      category: 'Segurança',
      content: `Manter-se segura no dia a dia exige atenção e algumas práticas simples. Confira algumas dicas essenciais:

1. Esteja sempre atenta ao seu redor. Evite distrações como o uso excessivo do celular em locais públicos.
2. Compartilhe sua localização em tempo real com pessoas de confiança quando estiver se deslocando sozinha.
3. Evite locais mal iluminados e pouco movimentados, especialmente à noite.
4. Tenha sempre à mão os números de emergência e saiba como acionar o botão de pânico do seu aplicativo de segurança.

Lembre-se: sua segurança é prioridade.`,
    },
    {
      id: '3',
      title: 'Conheça a rede de apoio em sua cidade',
      date: new Date('2023-11-15'),
      category: 'Comunidade',
      content: `Saber onde buscar ajuda é fundamental. Nossa cidade conta com uma ampla rede de apoio para mulheres, incluindo:

- Delegacias Especializadas de Atendimento à Mulher (DEAM)
- Casas Abrigo
- Centros de Referência da Mulher
- Defensoria Pública

No aplicativo Frida, você pode encontrar o mapa completo com todos esses pontos de apoio e traçar rotas seguras até eles. Não hesite em buscar ajuda.`,
    },
    // Generating more mock data for pagination testing
    ...Array.from({ length: 20 }).map((_, i) => ({
      id: `${i + 4}`,
      title: `Notícia Exemplo ${i + 1}: Avanços na Igualdade de Gênero`,
      date: new Date(new Date('2023-11-10').setDate(new Date('2023-11-10').getDate() - i)),
      category: i % 3 === 0 ? 'Legislação' : i % 3 === 1 ? 'Segurança' : 'Comunidade',
      content: 'Conteúdo de exemplo para testar a paginação e o carregamento infinito de notícias.',
    })),
  ];

  for (const newsItem of newsData) {
    await prisma.news.upsert({
      where: { id: newsItem.id },
      update: {},
      create: newsItem,
    });
  }

  console.log('News seeded');
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
