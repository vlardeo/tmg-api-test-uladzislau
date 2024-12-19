import { Router } from 'express';
import { validate } from '@/middlewares/schema-validator';
import {
  deleteStoreValue,
  getStoreValue,
  setStoreValue,
} from '@/controllers/store.controller';
import { SetStoreValueSchema } from '@/controllers/store.controller.schema';

export const storeRouter = Router();

storeRouter.post('/', validate(SetStoreValueSchema), setStoreValue);
storeRouter.get('/:key', getStoreValue);
storeRouter.delete('/:key', deleteStoreValue);
