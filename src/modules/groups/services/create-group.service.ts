import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '../entities/group.entity';
import { ICreateGroup } from '../usecase';
import { GroupRepositoryType } from '../repository/group.repository';

export class CreateGroupService implements ICreateGroup {
  constructor(private readonly groupRepository: GroupRepositoryType) {}
  async create(input: CreateGroupRequestDto): Promise<GroupEntity> {
    return await this.groupRepository.create(input);
  }
}
