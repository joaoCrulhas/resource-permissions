import { IAddResourceGlobal, IAddResourceGroup, IAddResourceUser } from '../usecases';
import { AddResourceGlobalService } from './add-resource-global.service';
import { resourceSharingRepositoryFactory } from '../repository';
import { getAllUsersServiceFactory } from '../../users/services';
import { AddResourceUserService } from './add-resource-user.service';
import { AddResourceGroupService } from './add-resource-group.service';
import { getUsersGroupServiceFactory } from '../../membership/services/services.factory';

export const addResourceGlobalServiceFactory = (): IAddResourceGlobal => {
  return new AddResourceGlobalService(
    getAllUsersServiceFactory(),
    resourceSharingRepositoryFactory()
  );
};

export const addResourceUserServiceFactory = (): IAddResourceUser => {
  return new AddResourceUserService(resourceSharingRepositoryFactory());
};

export const addResourceSharingGroupServiceFactory = (): IAddResourceGroup => {
  return new AddResourceGroupService(
    getUsersGroupServiceFactory(),
    resourceSharingRepositoryFactory()
  );
};
