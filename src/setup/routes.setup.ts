import { FastifyInstance } from 'fastify';
import { membershipRoutes } from '@membership/routes/membership.route';
import { resourceRoutes } from '@resources/routes';
import { setupResourceSharingRoutes } from '@resource-sharing/routes';
import { userRoutes } from '@users/routes';
import { groupRoutes } from '@groups/routes';

export const setupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering routes`);
  userRoutes(fastify);
  groupRoutes(fastify);
  membershipRoutes(fastify);
  resourceRoutes(fastify);
  setupResourceSharingRoutes(fastify);
  fastify.log.info(`Routes registered`);
};
