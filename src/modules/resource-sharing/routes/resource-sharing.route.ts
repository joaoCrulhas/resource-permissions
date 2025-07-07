import { FastifyInstance } from 'fastify';
import { fastifyRouterAdapter } from '../../../presentation/fastify-router.adapter';
import {
  addResourceGlobalControllerFactory,
  addResourceGroupControllerFactory,
  addResourceUserControllerFactory,
} from '../controllers';
import { printRoutes } from '../../../presentation';
import {
  AddResourceGlobalRequestDto,
  AddResourceGlobalResponseDto,
  AddResourceGroupRequestDto,
  AddResourceGroupResponseDto,
  AddResourceUserRequestDto,
  AddResourceUserResponseDto,
} from '../dtos';

const RESOURCE_SHARING_ROUTES = {
  ADD_RESOURCE_GROUP: '/api/resource-sharing/group',
  ADD_RESOURCE_USER: '/api/resource-sharing/user',
  ADD_RESOURCE_GLOBAL: '/api/resource-sharing/global',
} as const;

export const resourceSharingRoute = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering resource-sharing routes`);

  fastify.post(
    RESOURCE_SHARING_ROUTES.ADD_RESOURCE_USER,
    fastifyRouterAdapter<AddResourceUserRequestDto, AddResourceUserResponseDto>(
      addResourceUserControllerFactory()
    )
  );

  fastify.post(
    RESOURCE_SHARING_ROUTES.ADD_RESOURCE_GROUP,
    fastifyRouterAdapter<AddResourceGroupRequestDto, AddResourceGroupResponseDto>(
      addResourceGroupControllerFactory()
    )
  );

  fastify.post(
    RESOURCE_SHARING_ROUTES.ADD_RESOURCE_GLOBAL,
    fastifyRouterAdapter<AddResourceGlobalRequestDto, AddResourceGlobalResponseDto>(
      addResourceGlobalControllerFactory()
    )
  );

  printRoutes(fastify.log, RESOURCE_SHARING_ROUTES);
  fastify.log.info(`Membership routes registered`);
};
