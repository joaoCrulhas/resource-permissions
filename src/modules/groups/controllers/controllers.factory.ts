import { IController } from '../../../presentation';
import { GroupEntity } from '@groups/entities';
import { GetGroupsController } from './get-groups.controller';
import { createGroupServiceFactory, getGroupsServiceFactory } from '../services';
import { CreateGroupController } from './create-group.controller';
import { CreateGroupRequestDto } from '../dtos';

export const getGroupsControllerFactory = (): IController<void, GroupEntity[]> => {
  return new GetGroupsController(getGroupsServiceFactory());
};

export const createGroupControllerFactory = (): IController<CreateGroupRequestDto, GroupEntity> => {
  return new CreateGroupController(createGroupServiceFactory());
};
