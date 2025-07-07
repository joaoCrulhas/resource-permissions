import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '../entities/group.entity';

export interface ICreateGroup {
  exec(input: CreateGroupRequestDto): Promise<GroupEntity>;
}
