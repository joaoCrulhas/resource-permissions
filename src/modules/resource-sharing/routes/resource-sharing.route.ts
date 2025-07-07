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
import { errorAdapter } from '../../../errors';

const RESOURCE_SHARING_ROUTES = {
  ADD_RESOURCE_GROUP: '/api/resource-sharing/group',
  ADD_RESOURCE_USER: '/api/resource-sharing/user',
  ADD_RESOURCE_GLOBAL: '/api/resource-sharing/global',
  USERS_ACCESS_LIST: '/api/resource/:id/access-list',
  RESOURCES_BY_USER: '/api/user/:id/resources',
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

  fastify.get<{ Params: { id: number } }>(
    RESOURCE_SHARING_ROUTES.USERS_ACCESS_LIST,
    async (req, res) => {
      try {
        const controller = getUsersAccessListControllerFactory();
        const response = await controller.handle({
          resourceId: Number(req.params.id),
        });
        res.status(response.statusCode).send(response.body);
      } catch (e: unknown) {
        return errorAdapter(e);
      }
    }
  );

  fastify.get<{ Params: { id: number } }>(
    RESOURCE_SHARING_ROUTES.RESOURCES_BY_USER,
    async (req, res) => {
      try {
        const controller = getResourcesByUserControllerFactory();
        const response = await controller.handle({
          userId: Number(req.params.id),
        });
        res.status(response.statusCode).send({ data: response.body });
      } catch (e: unknown) {
        return errorAdapter(e);
      }
    }
  );

  printRoutes(fastify.log, RESOURCE_SHARING_ROUTES);
  fastify.log.info(`Resource sharing routes registered`);
};
