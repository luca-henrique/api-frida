"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatHandlers = void 0;
const database_1 = __importDefault(require("../../config/database"));
const registerChatHandlers = (io, socket) => {
    const userId = socket.data.user.id;
    socket.on('join_chat', (chatId) => {
        socket.join(chatId);
        console.log(`User ${userId} joined chat ${chatId}`);
    });
    socket.on('send_message', async (data) => {
        try {
            const { chatId, content } = data;
            // Ensure Chat exists (for mock/dev scenarios)
            let chat = await database_1.default.chat.findUnique({ where: { id: chatId } });
            if (!chat) {
                chat = await database_1.default.chat.create({
                    data: { id: chatId }
                });
                console.log(`[DEV] Created missing chat: ${chatId}`);
            }
            // Ensure User exists (for mock/dev scenarios)
            let user = await database_1.default.user.findUnique({ where: { id: userId } });
            if (!user) {
                console.log(`[DEV] Creating missing mock user: ${userId}`);
                user = await database_1.default.user.create({
                    data: {
                        id: userId,
                        name: userId === 'user-123' ? "Usuária Teste" : "Especialista",
                        email: `${userId}@test.com`,
                        password: "mock-password",
                        cpf: userId === 'user-123' ? "123.456.789-00" : "000.000.000-00",
                    }
                });
            }
            // Save to DB
            const message = await database_1.default.message.create({
                data: {
                    chatId,
                    senderId: userId,
                    content,
                },
                include: {
                    sender: {
                        select: { id: true, name: true },
                    },
                },
            });
            await database_1.default.chat.update({
                where: { id: chatId },
                data: { updatedAt: new Date() },
            });
            io.to(chatId).emit('receive_message', message);
        }
        catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });
};
exports.registerChatHandlers = registerChatHandlers;
