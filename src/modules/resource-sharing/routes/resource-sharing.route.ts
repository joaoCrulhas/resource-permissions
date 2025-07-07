import { FastifyInstance } from 'fastify';
import { printRoutes } from '../../../presentation';
import { fastifyRouterAdapter } from '../../../presentation/fastify-router.adapter';
import {
  addResourceGlobalControllerFactory,
  addResourceGroupControllerFactory,
  addResourceUserControllerFactory,
  getResourcesByUserControllerFactory,
  getUsersAccessListControllerFactory,
} from '../controllers';

const RESOURCE_SHARING_ROUTES = {
  ADD_RESOURCE_GROUP: '/api/resource-sharing/group',
  ADD_RESOURCE_USER: '/api/resource-sharing/user',
  ADD_RESOURCE_GLOBAL: '/api/resource-sharing/global',
  USERS_ACCESS_LIST: '/api/resource/:resourceId/access-list',
  RESOURCES_BY_USER: '/api/user/:userId/resources',
} as const;

export const setupResourceSharingRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering resource sharing routes`);

  fastify.post(
    RESOURCE_SHARING_ROUTES.ADD_RESOURCE_USER,
    fastifyRouterAdapter(addResourceUserControllerFactory())
  );

  fastify.post(
    RESOURCE_SHARING_ROUTES.ADD_RESOURCE_GROUP,
    fastifyRouterAdapter(addResourceGroupControllerFactory())
  );

  fastify.post(
    RESOURCE_SHARING_ROUTES.ADD_RESOURCE_GLOBAL,
    fastifyRouterAdapter(addResourceGlobalControllerFactory())
  );

  fastify.get<{ Params: { resourceId: number } }>(
    RESOURCE_SHARING_ROUTES.USERS_ACCESS_LIST,
    fastifyRouterAdapter(getUsersAccessListControllerFactory())
  );

  fastify.get<{ Params: { userId: number } }>(
    RESOURCE_SHARING_ROUTES.RESOURCES_BY_USER,
    fastifyRouterAdapter(getResourcesByUserControllerFactory())
  );

  printRoutes(fastify.log, RESOURCE_SHARING_ROUTES);
  fastify.log.info(`Resource sharing routes registered`);
};
