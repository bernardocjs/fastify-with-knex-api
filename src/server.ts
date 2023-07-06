import fastify from "fastify";
import { setupKnex } from "./database";
import crypto from "node:crypto";

const server = fastify();

server.get("/hello", async () => {
  const transaction = await setupKnex("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "Primeira transacao",
      amount: 1000,
    })
    .returning("*");

  return transaction;
});

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
