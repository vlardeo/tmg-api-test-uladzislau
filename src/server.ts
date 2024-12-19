import express from 'express';
import { stackRouter } from '@/routers/stack.router';
import { storeRouter } from '@/routers/store.router';
import { errorHandler } from '@/middlewares/error-handler';

export const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/stack', stackRouter);
server.use('/store', storeRouter);

server.use(errorHandler);
