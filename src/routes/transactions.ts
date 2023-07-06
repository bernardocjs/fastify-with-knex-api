import { FastifyInstance } from "fastify";
import { setupKnex } from "../database";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import { createTransactionBodySchema } from "../schemas/create-transaction.schema";
import { getTransactionsParamsSchema } from "../schemas/get-transaction-params.schema";

export async function transactionRoutes(server: FastifyInstance) {
  server.post("/", async (request, reply) => {
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
        httpOnly: true,
      });
    }

    await setupKnex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });

  server.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies;
    const transactions = await setupKnex("transactions")
      .select()
      .where("session_id", sessionId);
    return {
      transactions,
    };
  });

  server.get(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { id } = getTransactionsParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const transaction = await setupKnex("transactions")
        .select()
        .where({ id })
        .andWhere("session_id", sessionId)
        .first();
      return {
        transaction,
      };
    }
  );

  server.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies;

      const balance = await setupKnex("transactions")
        .sum("amount", {
          as: "balance",
        })
        .where("session_id", sessionId)
        .first();
      return {
        balance,
      };
    }
  );
}
