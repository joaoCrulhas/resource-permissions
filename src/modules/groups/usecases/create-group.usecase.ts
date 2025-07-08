import { CreateGroupRequestDto } from '@groups/dtos';
import { GroupEntity } from '@groups/entities';

export interface ICreateGroup {
  exec(input: CreateGroupRequestDto): Promise<GroupEntity>;
}
