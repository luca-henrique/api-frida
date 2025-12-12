'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RiskAssessmentService = void 0;
const tsyringe_1 = require('tsyringe');
const RiskAssessmentRepository_1 = require('../repositories/RiskAssessmentRepository');
let RiskAssessmentService = class RiskAssessmentService {
  constructor(riskRepository) {
    this.riskRepository = riskRepository;
  }
  async create(userId, answers) {
    const totalScore = answers.reduce((a, b) => a + b, 0);
    let riskLevel = 'LOW';
    if (totalScore >= 3) {
      riskLevel = 'HIGH';
    } else if (totalScore >= 1) {
      riskLevel = 'MEDIUM';
    }
    return this.riskRepository.create({
      userId,
      score: totalScore,
      riskLevel,
      answers: JSON.stringify(answers),
    });
  }
  async list(userId) {
    return this.riskRepository.findManyByUserId(userId);
  }
};
exports.RiskAssessmentService = RiskAssessmentService;
exports.RiskAssessmentService = RiskAssessmentService = __decorate(
  [
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(RiskAssessmentRepository_1.RiskAssessmentRepository)),
    __metadata('design:paramtypes', [RiskAssessmentRepository_1.RiskAssessmentRepository]),
  ],
  RiskAssessmentService,
);
