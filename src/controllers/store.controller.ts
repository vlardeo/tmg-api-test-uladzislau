import { StoreItemValue } from '@/domain/store';
import { storeService } from '@/services/store.service';
import { Request, Response, NextFunction } from 'express';

export type SetStoreValueRequest = Request<
  unknown,
  unknown,
  {
    key: string;
    value: StoreItemValue;
    ttl?: number;
  },
  unknown
>;

export type GetStoreValueRequest = Request<
  { key: string },
  unknown,
  unknown,
  unknown
>;

export type DeleteStoreValueRequest = GetStoreValueRequest;

const setStoreValue = (
  req: SetStoreValueRequest,
  res: Response,
  next: NextFunction,
) => {
  const { key, value, ttl } = req.body;

  try {
    storeService.set(key, value, ttl);
    res.status(201).send({ message: 'Value successfully added to the store!' });
  } catch (err: unknown) {
    next(err);
  }
};

const getStoreValue = (
  req: GetStoreValueRequest,
  res: Response,
  next: NextFunction,
) => {
  const { key } = req.params;

  try {
    const value = storeService.get(key);

    if (!value) {
      res.status(404).send({
        message: `No value found for key '${key}' in the store`,
        value: null,
      });
    } else {
      res.status(200).send({ value });
    }
  } catch (err: unknown) {
    next(err);
  }
};

const deleteStoreValue = (
  req: DeleteStoreValueRequest,
  res: Response,
  next: NextFunction,
) => {
  const { key } = req.params;

  try {
    const value = storeService.get(key);

    if (!value) {
      res
        .status(404)
        .send({ message: `No value found for key '${key}' in the store` });
    } else {
      storeService.delete(key);

      res.status(200).send({
        message: `Value '${value}' successfully deleted from the store`,
      });
    }
  } catch (err: unknown) {
    next(err);
  }
};

export { setStoreValue, getStoreValue, deleteStoreValue };
