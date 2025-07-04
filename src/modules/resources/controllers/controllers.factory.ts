import { IController } from '../../../presentation';
import { CreateResourceRequestDto } from '../dtos';
import { ResourceEntity } from '../entities';
import { CreateResourceController } from './create-resource.controller';
import { createResourceServiceFactory } from '../services';

export const createResourceControllerFactory = (): IController<
  CreateResourceRequestDto,
  ResourceEntity
> => {
  return new CreateResourceController(createResourceServiceFactory());
};
