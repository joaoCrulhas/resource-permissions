import {
  AddResourceGroupController,
  AddResourceGroupControllerType,
} from './add-resource-group.controller';
import {
  addResourceGlobalServiceFactory,
  addResourceGroupServiceFactory,
  addResourceUserServiceFactory,
} from '../services';
import {
  AddResourceUserController,
  AddResourceUserControllerType,
} from './add-resource-user.controller';
import {
  AddResourceGlobalController,
  AddResourceGlobalControllerType,
} from './add-resource-global.controller';

export const addResourceGroupControllerFactory = (): AddResourceGroupControllerType => {
  return new AddResourceGroupController(addResourceGroupServiceFactory());
};

export const addResourceUserControllerFactory = (): AddResourceUserControllerType => {
  return new AddResourceUserController(addResourceUserServiceFactory());
};

export const addResourceGlobalControllerFactory = (): AddResourceGlobalControllerType => {
  return new AddResourceGlobalController(addResourceGlobalServiceFactory());
};
