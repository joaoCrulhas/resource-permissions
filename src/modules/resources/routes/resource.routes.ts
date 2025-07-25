import { FastifyInstance } from 'fastify';
import {
  createResourceControllerFactory,
  getAllResourcesControllerFactory,
} from '@resources/controllers';
import { fastifyPreHandlerAdapter, fastifyRouterAdapter, printRoutes } from '@presentation/index';
import { createResourceValidatorFactory } from '@resources/validators';

const RESOURCE_ROUTES = {
  CREATE_RESOURCE: '/api/resource',
  GET_ALL_RESOURCES_WITH_USER_COUNT: '/api/resource/with-user-count',
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

  fastify.get(
    RESOURCE_ROUTES.GET_ALL_RESOURCES_WITH_USER_COUNT,
    fastifyRouterAdapter(getAllResourcesControllerFactory())
  );

  printRoutes(fastify.log, RESOURCE_ROUTES);
  fastify.log.info(`Resource routes registered`);
};
