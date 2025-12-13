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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const AppError_1 = require('../errors/AppError');
const tsyringe_1 = require('tsyringe');
const UserRepository_1 = require('../repositories/UserRepository');
let AuthService = class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async register(data) {
    const existingUser = await this.userRepository.findByEmailOrCpf(data.email, data.cpf);
    if (existingUser) {
      throw new AppError_1.AppError('User already exists');
    }
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError_1.AppError('Invalid credentials', 401);
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError_1.AppError('Invalid credentials', 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate(
  [
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(UserRepository_1.UserRepository)),
    __metadata('design:paramtypes', [UserRepository_1.UserRepository]),
  ],
  AuthService
);
