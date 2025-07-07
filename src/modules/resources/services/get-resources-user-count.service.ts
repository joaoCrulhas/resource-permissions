import { IGetResourcesUserCount } from '../usecases';
import { ResourceRepositoryType } from '../repository';
import { ResourceEntity } from '../entities';

export class GetResourcesUserCountService implements IGetResourcesUserCount {
  constructor(private readonly resourceRepository: ResourceRepositoryType) {}
  async getResourcesUserCount(): Promise<ResourceEntity[]> {
    return await this.resourceRepository.fetchAll();
  }
}
