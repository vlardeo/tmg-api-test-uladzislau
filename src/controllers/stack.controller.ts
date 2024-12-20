import { StackItem } from '@/domain/stack';
import { stackService } from '@/services/stack.service';
import { Request, Response, NextFunction } from 'express';

export type AddStackItemRequest = Request<
  unknown,
  unknown,
  { item: StackItem },
  object
>;

const addStackItem = (
  req: AddStackItemRequest,
  res: Response,
  next: NextFunction,
) => {
  const { item } = req.body;

  try {
    stackService.addItem(item);
    res.status(201).send({ message: 'Item successfully added to the stack!' });
  } catch (err: unknown) {
    next(err);
  }
};

const getStackItem = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const item = stackService.removeItem();

    if (!item) {
      res.status(404).send({ message: 'No items in the stack' });
    } else {
      res.status(200).send({ item });
    }
  } catch (err: unknown) {
    next(err);
  }
};

export { addStackItem, getStackItem };
