import { z } from "zod";

export const getTransactionsParamsSchema = z.object({
  id: z.string().uuid(),
});
