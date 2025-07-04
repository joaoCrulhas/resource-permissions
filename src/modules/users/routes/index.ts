import { FastifyInstance } from 'fastify';
import { createUserControllerFactory, getUsersControllerFactory } from '../controllers';
import { createUserValidatorFactory } from '../validators/create-user-validator.factory';
import { fastifyPreHandlerAdapter } from '../../../presentation';
import { fastifyRouterAdapter } from '../../../presentation/fastify-router.adapter';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering user routes`);
  fastify.get('/api/user', fastifyRouterAdapter(getUsersControllerFactory()));
  fastify.post(
    '/api/user',
    {
      preHandler: [fastifyPreHandlerAdapter(createUserValidatorFactory())],
    },
    fastifyRouterAdapter(createUserControllerFactory())
  );
  fastify.log.info(`User routes registered`);
};
