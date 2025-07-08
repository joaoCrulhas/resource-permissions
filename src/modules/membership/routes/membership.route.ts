import { FastifyInstance } from 'fastify';
import {
  addUserGroupControllerFactory,
  getUsersGroupControllerFactory,
} from '@membership/controllers';
import { fastifyRouterAdapter, printRoutes } from '@presentation/index';

const MEMBERSHIP_ROUTES = {
  ADD_USER_GROUP: '/api/membership',
  GET_USERS_GROUP: '/api/membership/:groupId',
} as const;

export const membershipRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering membership routes`);

  fastify.post(
    MEMBERSHIP_ROUTES.ADD_USER_GROUP,
    fastifyRouterAdapter(addUserGroupControllerFactory())
  );
  fastify.get<{ Params: { groupId: number } }>(
    MEMBERSHIP_ROUTES.GET_USERS_GROUP,
    fastifyRouterAdapter(getUsersGroupControllerFactory())
  );

  printRoutes(fastify.log, MEMBERSHIP_ROUTES);
  fastify.log.info(`Membership routes registered`);
};
