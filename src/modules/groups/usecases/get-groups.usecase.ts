import { GroupEntity } from '@groups/entities';

export interface IGetGroups {
  exec(): Promise<GroupEntity[]>;
}
