import { CreateUserService, GetUsersService } from '../index';
import { userRepositoryFactory } from '../../repository';
import { IGetUsers } from '../../usecases/get-user.usecase';
import { ICreateUser } from '../../usecases';

export const createUserServiceFactory = (): ICreateUser => {
  return new CreateUserService(userRepositoryFactory());
};

export const getUsersServiceFactory = (): IGetUsers => {
  return new GetUsersService(userRepositoryFactory());
};
