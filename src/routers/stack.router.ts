import { Router } from 'express';
import { addItem, getItem } from '@/controllers/stack.controller';
import { AddItemSchema } from '@/controllers/stack.controller.schema';
import { validate } from '@/middlewares/schema-validator';

export const stackRouter = Router();

stackRouter.get('/', getItem);
stackRouter.post('/', validate(AddItemSchema), addItem);
