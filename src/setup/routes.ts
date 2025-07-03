import { FastifyInstance } from 'fastify';
import { userRoutes } from '../modules/users/routes';

export const setupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering routes`);
  userRoutes(fastify);
};
