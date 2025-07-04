import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '../entities/group.entity';
import { GroupRepositoryType } from '../repository';
import { ICreateGroup } from '../usecases';

export class CreateGroupService implements ICreateGroup {
  constructor(private readonly groupRepository: GroupRepositoryType) {}
  async create(input: CreateGroupRequestDto): Promise<GroupEntity> {
    return await this.groupRepository.create(input);
  }
}
