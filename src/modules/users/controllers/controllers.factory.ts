import { GetUsersController, GetUsersControllerType } from './get-users.controller';
import { createUserServiceFactory, getUsersServiceFactory } from '../services';
import { CreateUserController } from './create-user.controller';

export const getUsersControllerFactory = (): GetUsersControllerType => {
  return new GetUsersController(getUsersServiceFactory());
};

export const createUserControllerFactory = (): CreateUserController => {
  return new CreateUserController(createUserServiceFactory());
};
