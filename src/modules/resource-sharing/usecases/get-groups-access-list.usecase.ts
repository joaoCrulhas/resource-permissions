import { GroupEntity } from '../../groups/entities/group.entity';

export interface IGetGroupsAccessList {
  getGroupsAccessList(resourceId: number): Promise<GroupEntity[]>;
}
