import { FastifyInstance } from 'fastify';
import { createResourceControllerFactory } from '../controllers';
import { fastifyPreHandlerAdapter, printRoutes } from '../../../presentation';
import { createResourceValidatorFactory } from '../validators';
import { fastifyRouterAdapter } from '../../../presentation/fastify-router.adapter';

const RESOURCE_ROUTES = {
  CREATE_RESOURCE: '/api/resource',
} as const;
export const resourceRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering resource routes`);
  fastify.post(
    RESOURCE_ROUTES.CREATE_RESOURCE,
    {
      preHandler: [fastifyPreHandlerAdapter(createResourceValidatorFactory())],
    },
    fastifyRouterAdapter(createResourceControllerFactory())
  );
  printRoutes(fastify.log, RESOURCE_ROUTES);
  fastify.log.info(`Resource routes registered`);
};
