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
exports.ChatController = void 0;
const ChatService_1 = require('../services/ChatService');
const zod_1 = require('zod');
const tsyringe_1 = require('tsyringe');
let ChatController = class ChatController {
  constructor(chatService) {
    this.chatService = chatService;
    this.listChats = async (req, res, next) => {
      try {
        const userId = req.userId;
        const chats = await this.chatService.listChats(userId);
        res.json(chats);
      } catch (error) {
        next(error);
      }
    };
    this.getChat = async (req, res, next) => {
      try {
        const { id } = req.params;
        const userId = req.userId;
        const chat = await this.chatService.getChat(id, userId);
        res.json(chat);
      } catch (error) {
        next(error);
      }
    };
    this.createChat = async (req, res, next) => {
      try {
        const schema = zod_1.z.object({
          participantId: zod_1.z.string(),
        });
        const { participantId } = schema.parse(req.body);
        const userId = req.userId;
        const chat = await this.chatService.createChat(userId, participantId);
        res.status(201).json(chat);
      } catch (error) {
        next(error);
      }
    };
  }
};
exports.ChatController = ChatController;
exports.ChatController = ChatController = __decorate(
  [
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ChatService_1.ChatService)),
    __metadata('design:paramtypes', [ChatService_1.ChatService]),
  ],
  ChatController
);
