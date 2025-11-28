"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = exports.io = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const socket_service_1 = require("../services/socket.service");
const initSocket = (httpServer) => {
    exports.io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*', // Allow all origins for mobile app
            methods: ['GET', 'POST'],
        },
    });
    exports.io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        // Mock tokens for testing
        if (token === 'mock-jwt-token') {
            socket.data.user = { id: 'user-123', role: 'WOMAN' };
            return next();
        }
        if (token === 'mock-jwt-token-gov') {
            socket.data.user = { id: 'specialist-1', role: 'GOV' };
            return next();
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            socket.data.user = decoded;
            next();
        }
        catch (err) {
            next(new Error('Authentication error'));
        }
    });
    (0, socket_service_1.registerSocketHandlers)(exports.io);
    return exports.io;
};
exports.initSocket = initSocket;
