"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = void 0;
const chat_socket_1 = require("./socket/chat.socket");
const location_socket_1 = require("./socket/location.socket");
const registerSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        const userId = socket.data.user.id;
        const userRole = socket.data.user.role;
        // Join government updates room if user is GOV
        if (userRole === 'GOV') {
            socket.join('gov_updates');
            console.log(`User ${userId} (GOV) joined gov_updates`);
        }
        // Register modular handlers
        (0, chat_socket_1.registerChatHandlers)(io, socket);
        (0, location_socket_1.registerLocationHandlers)(io, socket);
    });
};
exports.registerSocketHandlers = registerSocketHandlers;
