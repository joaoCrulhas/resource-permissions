import {
  AddResourceGroupController,
  AddResourceGroupControllerType,
} from './add-resource-group.controller';
import {
  addResourceGlobalServiceFactory,
  addResourceSharingGroupServiceFactory,
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

/**
 * Factory function that creates and returns a new instance of AddResourceGroupController
 * with all its dependencies properly injected.
 *
 * @returns {AddResourceGroupControllerType} A new instance of AddResourceGroupController
 * configured with a resource sharing group service
 */
export const addResourceGroupControllerFactory = (): AddResourceGroupControllerType => {
  return new AddResourceGroupController(addResourceSharingGroupServiceFactory());
};

/**
 * Factory function that creates and returns a new instance of AddResourceUserController
 * with all its dependencies properly injected.
 *
 * @returns {AddResourceUserControllerType} A new instance of AddResourceUserController
 * configured with a resource user service
 */
export const addResourceUserControllerFactory = (): AddResourceUserControllerType => {
  return new AddResourceUserController(addResourceUserServiceFactory());
};

/**
 * Factory function that creates and returns a new instance of AddResourceGlobalController
 * for global resource sharing with all its dependencies properly injected.
 *
 * @returns {AddResourceGlobalController} A new instance of AddResourceGroupController
 * configured with a resource sharing group service for global operations
 */
export const addResourceGlobalControllerFactory = (): AddResourceGlobalControllerType => {
  return new AddResourceGlobalController(addResourceGlobalServiceFactory());
};
