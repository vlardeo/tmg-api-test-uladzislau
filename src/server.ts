import express from 'express';
import { errorHandler } from '@/middlewares/error-handler';
import { stackRouter } from '@/routers/stack.router';

export const server = express();

server.use(express.json());

// Routes
server.use('/stack', stackRouter);

server.use(errorHandler);
