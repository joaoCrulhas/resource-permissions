import {
  IAddResourceToGroup,
  IAddResourceUser,
  IGetResourcesByUser,
  IGetUsersAccessList,
} from '../usecases';
import { AddResourceGroupService } from './add-resource-group.service';
import { resourceSharingRepositoryFactory } from '../repository';
import { AddResourceUserService } from './add-resource-user.service';
import { IAddResourceGlobal } from '@resource-sharing/usecases';
import { AddResourceGlobalService } from './add-resource-global.service';
import { GetUsersAccessListService } from './get-users-access-list.service';
import { GetResourcesByUserService } from './get-resources-by-user.service';
import { getUsersServiceFactory } from '@users/services';

export const addResourceGroupServiceFactory = (): IAddResourceToGroup => {
  return new AddResourceGroupService(resourceSharingRepositoryFactory());
};

export const addResourceUserServiceFactory = (): IAddResourceUser => {
  return new AddResourceUserService(resourceSharingRepositoryFactory());
};

export const addResourceGlobalServiceFactory = (): IAddResourceGlobal => {
  return new AddResourceGlobalService(getUsersServiceFactory(), resourceSharingRepositoryFactory());
};

export const getUsersAccessListServiceFactory = (): IGetUsersAccessList => {
  return new GetUsersAccessListService(resourceSharingRepositoryFactory());
};

export const getResourcesByUserServiceFactory = (): IGetResourcesByUser => {
  return new GetResourcesByUserService(resourceSharingRepositoryFactory());
};
