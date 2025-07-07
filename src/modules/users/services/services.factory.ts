import { CreateUserService, GetUsersService } from './index';
import { userRepositoryFactory } from '../repository';
import { ICreateUser, IGetUsers } from '../usecases';
import { getResourcesByUserServiceFactory } from '../../resource-sharing/services';

export const createUserServiceFactory = (): ICreateUser => {
  return new CreateUserService(userRepositoryFactory());
};

export const getUsersServiceFactory = (): IGetUsers => {
  return new GetUsersService(getResourcesByUserServiceFactory(), userRepositoryFactory());
};
