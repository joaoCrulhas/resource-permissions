import { ICreateResource, IGetResourcesUserCount } from '../usecases';
import { CreateResourceService } from './create-resource.service';
import { resourceRepositoryFactory } from '../repository';
import { GetResourcesUserCountService } from './get-resources-user-count.service';

export const createResourceServiceFactory = (): ICreateResource => {
  return new CreateResourceService(resourceRepositoryFactory());
};

export const getResourceUsersCountServiceFactory = (): IGetResourcesUserCount => {
  return new GetResourcesUserCountService(resourceRepositoryFactory());
};
