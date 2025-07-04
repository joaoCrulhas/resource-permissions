import { ICreateResource } from '../usecases';
import { CreateResourceService } from './create-resource.service';
import { resourceRepositoryFactory } from '../repository';

export const createResourceServiceFactory = (): ICreateResource => {
  return new CreateResourceService(resourceRepositoryFactory());
};
