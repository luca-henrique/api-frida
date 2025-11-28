"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const AppError_1 = require("../errors/AppError");
function errorMiddleware(error, req, res, next) {
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors: error.issues,
        });
    }
    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}
