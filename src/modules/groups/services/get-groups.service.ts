import { GroupEntity } from '@groups/entities';
import { GroupRepositoryType } from '@groups/repository';
import { IGetGroups } from '@groups/usecases';

export class GetGroupsService implements IGetGroups {
  constructor(private readonly groupRepository: GroupRepositoryType) {}
  async exec(): Promise<GroupEntity[]> {
    return await this.groupRepository.fetchAll();
  }
}
