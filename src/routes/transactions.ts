import { FastifyInstance } from "fastify";
import { z } from "zod";
import { setupKnex } from "../database";
import { randomUUID } from "node:crypto";

export async function transactionRoutes(server: FastifyInstance) {
  server.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    await setupKnex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });

  server.get("/", async () => {
    const transactions = await setupKnex("transactions").select();
    return {
      transactions,
    };
  });

  server.get("/:id", async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = getTransactionsParamsSchema.parse(request.params);

    const transaction = await setupKnex("transactions")
      .select()
      .where({ id })
      .first();
    return {
      transaction,
    };
  });

  server.get("/summary", async () => {
    const balance = await setupKnex("transactions")
      .sum("amount", {
        as: "balance",
      })
      .first();
    return {
      balance,
    };
  });
}
