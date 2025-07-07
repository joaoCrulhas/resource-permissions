import { FastifyInstance } from 'fastify';
import { userRoutes } from '../modules/users/routes';
import { groupRoutes } from '../modules/groups/routes';
import { membershipRoutes } from '../modules/membership/routes';
import { resourceRoutes } from '../modules/resources/routes/resource.routes';
import { setupResourceSharingRoutes } from '../modules/resource-sharing/routes/resource-sharing.route';

export const setupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering routes`);
  userRoutes(fastify);
  groupRoutes(fastify);
  membershipRoutes(fastify);
  resourceRoutes(fastify);
  setupResourceSharingRoutes(fastify);
  fastify.log.info(`Routes registered`);
};
