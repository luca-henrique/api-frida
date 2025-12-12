import { injectable, inject } from 'tsyringe';
import { RiskAssessmentRepository } from '../repositories/RiskAssessmentRepository';
import { UserRepository } from '../modules/users/repositories/UserRepository';

const ANSWER_VALUES = {
  NAO: 0,
  SIM: 1,
  NAO_SABE: 2,
  NAO_SE_APLICA: 3,
};

@injectable()
export class RiskAssessmentService {
  constructor(
    @inject(RiskAssessmentRepository) private riskRepository: RiskAssessmentRepository,
    @inject(UserRepository) private userRepository: UserRepository,
  ) {}

  private calculateRiskLevel(answers: { questionId: string; value: number }[]): {
    riskLevel: string;
    score: number;
  } {
    // Contagem das respostas
    const countSim = answers.filter((a) => a.value === ANSWER_VALUES.SIM).length;
    const countNao = answers.filter((a) => a.value === ANSWER_VALUES.NAO).length;
    const countNsNa = answers.filter(
      (a) => a.value === ANSWER_VALUES.NAO_SABE || a.value === ANSWER_VALUES.NAO_SE_APLICA,
    ).length;

    const validAnswers = countSim + countNao; // Respostas Válidas
    let riskLevel = 'LOW';

    // 1. Regras Automáticas (Corta-caminho)
    // "Sempre que 10 ou mais itens forem assinalados com 'sim', temos automaticamente um risco elevado"
    if (countSim >= 10) {
      return { riskLevel: 'HIGH', score: countSim };
    }

    // "Sempre que 10 ou mais itens forem assinalados como 'não sabe' ou 'não se aplica', temos automaticamente um risco médio"
    if (countNsNa >= 10) {
      return { riskLevel: 'MEDIUM', score: countSim };
    }

    // 2. Cálculo Percentual (Grelha de Cotação)
    // A lógica combinatória se baseia na % de 'SIM' sobre as respostas válidas (Sim + Não)
    if (validAnswers > 0) {
      const percentage = countSim / validAnswers;

      if (percentage >= 0.5) {
        // "Se Sim >= 50% das respostas válidas = Elevado"
        riskLevel = 'HIGH';
      } else if (percentage >= 0.25) {
        // "Se Sim >= 25% e < 50% das respostas válidas = Médio"
        riskLevel = 'MEDIUM';
      } else {
        // "Se Sim < 25% das respostas válidas = Baixo"
        riskLevel = 'LOW';
      }
    } else {
      // Caso de borda: Se não houver respostas válidas (tudo NS/NA), mas for menos que 10 NS/NA.
      // Pela tabela, 0 Sim e <10 NS/NA resulta em Baixo.
      riskLevel = 'LOW';
    }

    return { riskLevel, score: countSim };
  }

  async create(userId: string, answers: { questionId: string; value: number }[]) {
    // Remove duplicatas, mantendo a última resposta para cada pergunta
    const uniqueAnswersMap = new Map<string, { questionId: string; value: number }>();
    answers.forEach((a) => uniqueAnswersMap.set(a.questionId, a));
    const uniqueAnswers = Array.from(uniqueAnswersMap.values());

    // Calcula o nível de risco baseado na metodologia FRIDA
    const { riskLevel, score } = this.calculateRiskLevel(uniqueAnswers);

    // Atualiza o nível de risco no cadastro da usuária
    await this.userRepository.update(userId, { riskLevel });

    // Verifica se já existe um assessment para essa usuária
    const existingAssessment = await this.riskRepository.findLatestByUserId(userId);

    if (existingAssessment) {
      // Se existir, atualiza o existente
      return this.riskRepository.update(existingAssessment.id, {
        score,
        riskLevel,
        answers: uniqueAnswers,
      });
    }

    // Se não existir, cria um novo
    return this.riskRepository.create({
      userId,
      score, // Armazenamos o total de 'SIM' como score para referência
      riskLevel,
      answers: uniqueAnswers,
    });
  }

  async list(userId: string) {
    return this.riskRepository.findManyByUserId(userId);
  }

  async getLatest(userId: string) {
    return this.riskRepository.findLatestByUserId(userId);
  }
}
