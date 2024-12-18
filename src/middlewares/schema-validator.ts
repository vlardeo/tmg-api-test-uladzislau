import { ZodValidationError } from '@/domain/error';
import type { Request, Response, NextFunction } from 'express';
import { z, type AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.reduce((acc, error) => {
          acc.push({
            message: error.message,
            property: error.path.join('.'),
          });

          return acc;
        }, [] as ZodValidationError[]);

        res.status(400).send(errors);

        return;
      }

      next(err);
    }
  };
