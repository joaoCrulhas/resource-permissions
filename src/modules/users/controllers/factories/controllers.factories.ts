import { IController } from '../../../../presentation';
import { UserEntity } from '../../entities/user.entity';
import { GetUsersController } from '../get-users.controller';
import { createUserServiceFactory, getUsersServiceFactory } from '../../services';
import { CreateUserController } from '../create-user.controller';

export const getUsersControllerFactory = (): IController<void, UserEntity[]> => {
  return new GetUsersController(getUsersServiceFactory());
};

export const createUserControllerFactory = (): CreateUserController => {
  return new CreateUserController(createUserServiceFactory());
};
