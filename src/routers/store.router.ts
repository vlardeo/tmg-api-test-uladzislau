import { Router } from 'express';
import { validate } from '@/middlewares/schema-validator';
import {
  deleteStoreValue,
  getStoreValue,
  setStoreValue,
} from '@/controllers/store.controller';
import {
  SetStoreValueSchema,
  StoreKeyParamSchema,
} from '@/controllers/store.controller.schema';

export const storeRouter = Router();

storeRouter.post('/', validate(SetStoreValueSchema), setStoreValue);
storeRouter.get('/:key', validate(StoreKeyParamSchema), getStoreValue);
storeRouter.delete('/:key', validate(StoreKeyParamSchema), deleteStoreValue);
