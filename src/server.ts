import express from 'express';

export const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
