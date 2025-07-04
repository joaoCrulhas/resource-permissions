import { FastifyInstance } from 'fastify';
import { fastifyPreHandlerAdapter, printRoutes } from '../../../presentation';
import { createGroupControllerFactory, getGroupsControllerFactory } from '../controllers';
import { groupValidatorsFactory } from '../validators';
import { fastifyRouterAdapter } from '../../../presentation/fastify-router.adapter';

const GROUP_ROUTES = {
  GET_GROUPS: '/api/group',
  CREATE_GROUP: '/api/group',
} as const;

export const groupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering group routes`);
  fastify.get(GROUP_ROUTES.GET_GROUPS, fastifyRouterAdapter(getGroupsControllerFactory()));
  fastify.post(
    GROUP_ROUTES.CREATE_GROUP,
    {
      preHandler: [fastifyPreHandlerAdapter(groupValidatorsFactory())],
    },
    fastifyRouterAdapter(createGroupControllerFactory())
  );
  printRoutes(fastify.log, GROUP_ROUTES);
  fastify.log.info(`Group routes registered`);
};
