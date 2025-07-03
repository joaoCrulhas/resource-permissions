import { GroupEntity } from '../entities/group.entity';
import { IGetGroups } from '../usecase';
import { GroupRepositoryType } from '../repository/group.repository';

export class GetGroupsService implements IGetGroups {
  constructor(private readonly groupRepository: GroupRepositoryType) {}
  async getAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.fetchAll();
  }
}
