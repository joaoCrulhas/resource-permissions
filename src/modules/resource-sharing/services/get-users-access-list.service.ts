import { UserEntity } from '@users/entities/user.entity';
import { IGetUsersAccessList } from '@resource-sharing/usecases';
import { ResourceSharingRepositoryType } from '@resource-sharing/repository';

export class GetUsersAccessListService implements IGetUsersAccessList {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}
  async exec(resourceId: number): Promise<UserEntity[]> {
    return await this.resourceSharingRepository.getUsersAccessList(resourceId);
  }
}
