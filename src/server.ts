import fastify from "fastify";
import { env } from "./env";
import { transactionRoutes } from "./routes/transactions";

const server = fastify();

server.register(transactionRoutes, {
  prefix: "/transactions",
});

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP server running");
  });
