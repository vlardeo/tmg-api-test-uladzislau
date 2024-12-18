import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errStatus = err?.status || 500;
  const errMsg = err.message || 'Something went wrong';

  res.status(errStatus).json({
    message: errMsg,
  });
};
