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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ChatRepository = void 0;
const tsyringe_1 = require('tsyringe');
const database_1 = __importDefault(require('../config/database'));
let ChatRepository = class ChatRepository {
  async findManyByUserId(userId) {
    return database_1.default.chat.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
  async findById(id) {
    return database_1.default.chat.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }
  async findExisting(userId, participantId) {
    return database_1.default.chat.findFirst({
      where: {
        AND: [{ users: { some: { id: userId } } }, { users: { some: { id: participantId } } }],
      },
    });
  }
  async create(userId, participantId) {
    return database_1.default.chat.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: participantId }],
        },
      },
    });
  }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = __decorate(
  [(0, tsyringe_1.injectable)()],
  ChatRepository,
);
