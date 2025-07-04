import { IController } from '../../../presentation';
import { AddUserGroupDto, GetUsersGroupDto } from '../dtos';
import { AddUserGroupController } from './add-user-group.controller';
import { addUserServiceFactory, getUsersServiceFactory } from '../services/services.factory';
import { GetUserGroupController } from './get-user-group.controller';
import { UserEntity } from '../../users/entities/user.entity';

export const addUserGroupControllerFactory = (): IController<AddUserGroupDto, string> => {
  return new AddUserGroupController(addUserServiceFactory());
};

export const getUsersGroupControllerFactory = (): IController<GetUsersGroupDto, UserEntity[]> => {
  return new GetUserGroupController(getUsersServiceFactory());
};
