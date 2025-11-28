"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskAssessmentRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = __importDefault(require("../config/database"));
let RiskAssessmentRepository = class RiskAssessmentRepository {
    async create(data) {
        return database_1.default.riskAssessment.create({ data });
    }
    async findManyByUserId(userId) {
        return database_1.default.riskAssessment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.RiskAssessmentRepository = RiskAssessmentRepository;
exports.RiskAssessmentRepository = RiskAssessmentRepository = __decorate([
    (0, tsyringe_1.injectable)()
], RiskAssessmentRepository);
