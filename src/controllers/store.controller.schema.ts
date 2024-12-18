import z from 'zod';

export const SetStoreValueSchema = z.object({
  body: z
    .object({
      key: z.string().min(1),
      value: z.union([z.string().min(1), z.number()]),
      ttl: z.number().min(1).max(1440).optional(),
    })
    .strict(),
});

export const StoreKeyParamSchema = z.object({
  params: z
    .object({
      key: z.string().min(1),
    })
    .strict(),
});
