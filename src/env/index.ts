import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("prod"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

export const env = envSchema.parse(process.env);
