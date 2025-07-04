import { FastifyInstance } from 'fastify';
import { userRoutes } from '../modules/users/routes';
import { groupRoutes } from '../modules/groups/routes';
import { membershipRoutes } from '../modules/membership/routes';
import { resourceRoutes } from '../modules/resources/routes/resource.routes';

export const setupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering routes`);
  userRoutes(fastify);
  groupRoutes(fastify);
  membershipRoutes(fastify);
  resourceRoutes(fastify);
  fastify.log.info(`Routes registered`);
};
