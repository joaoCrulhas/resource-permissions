import { GetGroupsService } from './get-groups.service';
import { repositoryFactory } from '../repository';
import { CreateGroupService } from './create-group.service';
import { ICreateGroup, IGetGroups } from '../usecases';

export const getGroupsServiceFactory = (): IGetGroups => {
  return new GetGroupsService(repositoryFactory());
};

export const createGroupServiceFactory = (): ICreateGroup => {
  return new CreateGroupService(repositoryFactory());
};
