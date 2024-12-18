import { Router } from 'express';
import { addStackItem, getStackItem } from '@/controllers/stack.controller';
import { AddStackItemSchema } from '@/controllers/stack.controller.schema';
import { validate } from '@/middlewares/schema-validator';

export const stackRouter = Router();

stackRouter.get('/', addStackItem);
stackRouter.post('/', validate(AddStackItemSchema), getStackItem);
