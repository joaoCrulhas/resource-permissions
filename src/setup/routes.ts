import { FastifyInstance } from 'fastify';
import { userRoutes } from '../modules/users/routes';
import { groupRoutes } from '../modules/groups/routes';

export const setupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering routes`);
  userRoutes(fastify);
  groupRoutes(fastify);
  fastify.log.info(`Routes registered`);
};
