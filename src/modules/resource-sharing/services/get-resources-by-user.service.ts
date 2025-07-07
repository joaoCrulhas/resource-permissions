import { ResourceEntity } from '../../resources/entities';
import { IGetResourcesByUser } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';

export class GetResourcesByUserService implements IGetResourcesByUser {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}
  async exec(userId: number): Promise<ResourceEntity[]> {
    return await this.resourceSharingRepository.getResourcesByUser(userId);
  }
}
