import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
