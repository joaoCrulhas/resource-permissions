import { GroupEntity } from '../entities/group.entity';
import { GroupRepositoryType } from '../repository';
import { IGetGroups } from '../usecases';

export class GetGroupsService implements IGetGroups {
  constructor(private readonly groupRepository: GroupRepositoryType) {}
  async exec(): Promise<GroupEntity[]> {
    return await this.groupRepository.fetchAll();
  }
}
