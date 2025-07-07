import { GroupEntity } from '../entities/group.entity';

export interface IGetGroups {
  exec(): Promise<GroupEntity[]>;
}
