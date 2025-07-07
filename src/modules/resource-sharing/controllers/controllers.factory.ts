import {
  AddResourceGroupController,
  AddResourceGroupControllerType,
} from './add-resource-group.controller';
import {
  addResourceGlobalServiceFactory,
  addResourceGroupServiceFactory,
  addResourceUserServiceFactory,
  getResourcesByUserServiceFactory,
  getUsersAccessListServiceFactory,
} from '../services';
import {
  AddResourceUserController,
  AddResourceUserControllerType,
} from './add-resource-user.controller';
import {
  AddResourceGlobalController,
  AddResourceGlobalControllerType,
} from './add-resource-global.controller';
import {
  GetUsersAccessListController,
  GetUsersAccessListControllerType,
} from './get-users-access-list.controller';
import {
  GetResourcesByUserController,
  GetResourcesByUserControllerType,
} from './get-resources-by-user.controller';

export const addResourceGroupControllerFactory = (): AddResourceGroupControllerType => {
  return new AddResourceGroupController(addResourceGroupServiceFactory());
};

export const addResourceUserControllerFactory = (): AddResourceUserControllerType => {
  return new AddResourceUserController(addResourceUserServiceFactory());
};

export const addResourceGlobalControllerFactory = (): AddResourceGlobalControllerType => {
  return new AddResourceGlobalController(addResourceGlobalServiceFactory());
};

export const getUsersAccessListControllerFactory = (): GetUsersAccessListControllerType => {
  return new GetUsersAccessListController(getUsersAccessListServiceFactory());
};

export const getResourcesByUserControllerFactory = (): GetResourcesByUserControllerType => {
  return new GetResourcesByUserController(getResourcesByUserServiceFactory());
};
