import { CreateUserService, GetAllUsersService, GetUsersService } from './index';
import { userRepositoryFactory } from '../repository';
import { ICreateUser, IGetAllUsers, IGetUsers } from '../usecases';

export const createUserServiceFactory = (): ICreateUser => {
  return new CreateUserService(userRepositoryFactory());
};

export const getUsersServiceFactory = (): IGetUsers => {
  return new GetUsersService(userRepositoryFactory());
};

export const getAllUsersServiceFactory = (): IGetAllUsers => {
  return new GetAllUsersService(userRepositoryFactory());
};
