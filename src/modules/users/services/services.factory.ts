import { CreateUserService, GetUsersService } from '@users/services';
import { userRepositoryFactory } from '@users/repository';
import { ICreateUser, IGetUsers } from '@users/usecases';
import { getResourcesByUserServiceFactory } from '@resource-sharing/services';

export const createUserServiceFactory = (): ICreateUser => {
  return new CreateUserService(userRepositoryFactory());
};

export const getUsersServiceFactory = (): IGetUsers => {
  return new GetUsersService(getResourcesByUserServiceFactory(), userRepositoryFactory());
};
