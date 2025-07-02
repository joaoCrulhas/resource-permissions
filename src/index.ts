import fastify from 'fastify';

import 'dotenv/config';
import envVars from './config/env-vars';

const server = fastify();

server.get('/ping', async () => {
  return 'pong\n';
});

server.listen({ port: envVars.PORT }, (err, address) => {
  console.log(process.env);
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
