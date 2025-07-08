import { CreateGroupRequestDto } from '@groups/dtos';
import { GroupEntity } from '@groups/entities';
import { GroupRepositoryType } from '@groups/repository';
import { ICreateGroup } from '@groups/usecases';

export class CreateGroupService implements ICreateGroup {
  constructor(private readonly groupRepository: GroupRepositoryType) {}
  async exec(input: CreateGroupRequestDto): Promise<GroupEntity> {
    return await this.groupRepository.create(input);
  }
}
