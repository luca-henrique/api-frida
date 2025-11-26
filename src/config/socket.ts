import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';

interface SocketUser {
    id: string;
}

import { registerSocketHandlers } from '../services/socket.service';

export let io: SocketIOServer;

export const initSocket = (httpServer: HttpServer) => {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*', // Allow all origins for mobile app
            methods: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        // Mock tokens for testing
        if (token === 'mock-jwt-token') {
            socket.data.user = { id: 'user-123' };
            return next();
        }
        if (token === 'mock-jwt-token-gov') {
            socket.data.user = { id: 'specialist-1' };
            return next();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            socket.data.user = decoded as SocketUser;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    registerSocketHandlers(io);

    return io;
};
