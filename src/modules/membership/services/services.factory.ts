import { IAddUserToGroup, IGetUsersGroup } from '../usecases';
import { AddUserGroupService } from './add-user-group.service';
import { membershipRepositoryFactory } from '../repository';
import { GetUserGroupService } from './get-user-group.service';

export const addUserServiceFactory = (): IAddUserToGroup => {
  return new AddUserGroupService(membershipRepositoryFactory());
};

export const getUsersServiceFactory = (): IGetUsersGroup => {
  return new GetUserGroupService(membershipRepositoryFactory());
};
