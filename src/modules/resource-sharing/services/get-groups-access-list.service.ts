import { GroupEntity } from '../../groups/entities/group.entity';
import { IGetGroupsAccessList } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';

export class GetGroupsAccessListService implements IGetGroupsAccessList {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}
  async getGroupsAccessList(resourceId: number): Promise<GroupEntity[]> {
    const groups = await this.resourceSharingRepository.getUsersAccessList(resourceId);
    throw new Error('Method not implemented.');
  }
}
