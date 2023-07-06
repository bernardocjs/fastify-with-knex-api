import fastify from "fastify";
import { env } from "./env";
import { transactionRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";

const server = fastify();

server.register(transactionRoutes, {
  prefix: "/transactions",
});
server.register(cookie);

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP server running");
  });
