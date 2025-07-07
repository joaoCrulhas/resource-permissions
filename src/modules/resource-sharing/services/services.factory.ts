import { IAddResourceToGroup, IAddResourceUser } from '../usecases';
import { AddResourceGroupService } from './add-resource-group.service';
import { resourceSharingRepositoryFactory } from '../repository';
import { AddResourceUserService } from './add-resource-user.service';
import { IAddResourceGlobal } from '../usecases/add-resource-global.usecase';
import { AddResourceGlobalService } from './add-resource-global.service';
import { getAllUsersServiceFactory } from '../../users/services';

export const addResourceGroupServiceFactory = (): IAddResourceToGroup => {
  return new AddResourceGroupService(resourceSharingRepositoryFactory());
};

export const addResourceUserServiceFactory = (): IAddResourceUser => {
  return new AddResourceUserService(resourceSharingRepositoryFactory());
};

export const addResourceGlobalServiceFactory = (): IAddResourceGlobal => {
  return new AddResourceGlobalService(
    getAllUsersServiceFactory(),
    resourceSharingRepositoryFactory()
  );
};
