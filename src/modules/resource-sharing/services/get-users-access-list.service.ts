import { UserEntity } from '../../users/entities/user.entity';
import { IGetUsersAccessList } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';

export class GetUsersAccessListService implements IGetUsersAccessList {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}
  async exec(resourceId: number): Promise<UserEntity[]> {
    return await this.resourceSharingRepository.getUsersAccessList(resourceId);
  }
}
