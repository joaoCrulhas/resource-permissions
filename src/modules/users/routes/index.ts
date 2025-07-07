import { FastifyInstance } from 'fastify';
import { createUserControllerFactory, getUsersControllerFactory } from '../controllers';
import { createUserValidatorFactory } from '../validators/create-user-validator.factory';
import { fastifyPreHandlerAdapter, printRoutes } from '../../../presentation';
import { fastifyRouterAdapter } from '../../../presentation/fastify-router.adapter';
import { errorAdapter } from '../../../errors';

const USER_ROUTES = {
  GET_USERS: '/api/user',
  CREATE_USER: '/api/user',
  GET_USERS_WITH_RESOURCE_COUNT: '/api/user/with-resource-count',
} as const;

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering user routes`);

  fastify.get(USER_ROUTES.GET_USERS, async (req, res) => {
    try {
      const controller = getUsersControllerFactory();
      const response = await controller.handle({
        withResourcesAmount: false,
      });
      res.status(response.statusCode).send({ data: response.body });
    } catch (e) {
      errorAdapter(e);
    }
  });

  fastify.post(
    USER_ROUTES.CREATE_USER,
    {
      preHandler: [fastifyPreHandlerAdapter(createUserValidatorFactory())],
    },
    fastifyRouterAdapter(createUserControllerFactory())
  );

  fastify.get(USER_ROUTES.GET_USERS_WITH_RESOURCE_COUNT, async (req, res) => {
    const controller = getUsersControllerFactory();
    const response = await controller.handle({
      withResourcesAmount: true,
    });
    res.status(response.statusCode).send({ data: response.body });
  });

  printRoutes(fastify.log, USER_ROUTES);

  fastify.log.info(`User routes registered`);
};
