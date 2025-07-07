import { AddUserGroupController, AddUserGroupControllerType } from './add-user-group.controller';
import { addUserServiceFactory, getUsersGroupServiceFactory } from '../services/services.factory';
import { GetUserGroupController, GetUserGroupControllerType } from './get-user-group.controller';

export const addUserGroupControllerFactory = (): AddUserGroupControllerType => {
  return new AddUserGroupController(addUserServiceFactory());
};

export const getUsersGroupControllerFactory = (): GetUserGroupControllerType => {
  return new GetUserGroupController(getUsersGroupServiceFactory());
};
