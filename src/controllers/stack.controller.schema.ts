import z from 'zod';

export const AddStackItemSchema = z.object({
  body: z
    .object({
      item: z.union([z.string().min(1), z.number()]),
    })
    .strict(),
});
