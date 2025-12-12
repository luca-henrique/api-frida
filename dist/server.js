'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('reflect-metadata');
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const http_1 = __importDefault(require('http'));
const app_1 = __importDefault(require('./app'));
const database_1 = __importDefault(require('./config/database'));
const socket_1 = require('./config/socket');
const PORT = process.env.PORT || 3000;
async function main() {
  try {
    await database_1.default.$connect();
    console.log('Database connected');
    const server = http_1.default.createServer(app_1.default);
    (0, socket_1.initSocket)(server);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}
main();
