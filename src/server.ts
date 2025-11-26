import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import prisma from './config/database';
import { initSocket } from './config/socket';

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await prisma.$connect();
        console.log('Database connected');

        const server = http.createServer(app);
        initSocket(server);

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}

main();
