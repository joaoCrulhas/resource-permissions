import { GroupEntity } from '../entities/group.entity';

export interface IGetGroups {
  getAll(): Promise<GroupEntity[]>;
}
