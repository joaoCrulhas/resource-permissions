import fastify from 'fastify';

import 'dotenv/config';
import envVars from './config/env-vars';
import { PrismaSingleton } from './infra/database/prisma-singleton';
import { setupRoutes } from './setup/routes.setup';

const server = fastify({
  logger: true,
});

server.get('/health', async () => {
  return {
    status: 'ok',
  };
});

async function runServer() {
  const port = envVars.PORT;
  const prisma = PrismaSingleton.getInstance();
  try {
    await server.listen({ port: Number(port) });
    server.log.info(`server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

(async () => {
  setupRoutes(server);
  await runServer();
})();
