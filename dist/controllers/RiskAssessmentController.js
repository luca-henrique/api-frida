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
exports.RiskAssessmentController = void 0;
const RiskAssessmentService_1 = require('../services/RiskAssessmentService');
const zod_1 = require('zod');
const tsyringe_1 = require('tsyringe');
let RiskAssessmentController = class RiskAssessmentController {
  constructor(riskService) {
    this.riskService = riskService;
    this.create = async (req, res, next) => {
      try {
        const schema = zod_1.z.object({
          answers: zod_1.z.array(zod_1.z.number()),
        });
        const { answers } = schema.parse(req.body);
        const userId = req.userId;
        const assessment = await this.riskService.create(userId, answers);
        res.status(201).json(assessment);
      } catch (error) {
        next(error);
      }
    };
    this.list = async (req, res, next) => {
      try {
        const userId = req.userId;
        const assessments = await this.riskService.list(userId);
        res.json(assessments);
      } catch (error) {
        next(error);
      }
    };
  }
};
exports.RiskAssessmentController = RiskAssessmentController;
exports.RiskAssessmentController = RiskAssessmentController = __decorate(
  [
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(RiskAssessmentService_1.RiskAssessmentService)),
    __metadata('design:paramtypes', [RiskAssessmentService_1.RiskAssessmentService]),
  ],
  RiskAssessmentController
);
