import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { createUserControllerFactory, getUsersControllerFactory } from '@users/controllers';
import { createUserValidatorFactory } from '@users/validators';
import { fastifyPreHandlerAdapter, fastifyRouterAdapter, printRoutes } from '@presentation/index';

const USER_ROUTES = {
  GET_USERS: '/api/user',
  CREATE_USER: '/api/user',
  GET_USERS_WITH_RESOURCE_COUNT: '/api/user/with-resource-count',
} as const;

const preHandlerAdapter = (withResourcesAmount: boolean) => {
  return (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
    req.body = {
      withResourcesAmount,
    };
    done();
  };
};
export const userRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering user routes`);
  fastify.get(
    USER_ROUTES.GET_USERS,
    {
      preHandler: preHandlerAdapter(false),
    },
    fastifyRouterAdapter(getUsersControllerFactory())
  );

  fastify.post(
    USER_ROUTES.CREATE_USER,
    {
      preHandler: [fastifyPreHandlerAdapter(createUserValidatorFactory())],
    },
    fastifyRouterAdapter(createUserControllerFactory())
  );

  fastify.get(
    USER_ROUTES.GET_USERS_WITH_RESOURCE_COUNT,
    {
      preHandler: preHandlerAdapter(true),
    },
    fastifyRouterAdapter(getUsersControllerFactory())
  );

  printRoutes(fastify.log, USER_ROUTES);

  fastify.log.info(`User routes registered`);
};
