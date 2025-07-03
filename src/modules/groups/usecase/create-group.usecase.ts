import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '../entities/group.entity';

export interface ICreateGroup {
  create(input: CreateGroupRequestDto): Promise<GroupEntity>;
}
