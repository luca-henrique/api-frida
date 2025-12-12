'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require('zod');
exports.registerSchema = zod_1.z.object({
  name: zod_1.z.string(),
  email: zod_1.z.string().email(),
  password: zod_1.z.string().min(6),
  cpf: zod_1.z.string(),
  phone: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
  email: zod_1.z.string().email(),
  password: zod_1.z.string(),
});
