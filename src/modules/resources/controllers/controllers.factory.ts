import { IController } from '../../../presentation';
import { CreateResourceRequestDto } from '../dtos';
import { ResourceEntity } from '../entities';
import { CreateResourceController } from './create-resource.controller';
import { createResourceServiceFactory, getResourceUsersCountServiceFactory } from '../services';
import {
  GetAllResourcesController,
  GetAllResourcesControllerType,
} from './get-all-resources.controller';

export const createResourceControllerFactory = (): IController<
  CreateResourceRequestDto,
  ResourceEntity
> => {
  return new CreateResourceController(createResourceServiceFactory());
};

export const getAllResourcesControllerFactory = (): GetAllResourcesControllerType => {
  return new GetAllResourcesController(getResourceUsersCountServiceFactory());
};
