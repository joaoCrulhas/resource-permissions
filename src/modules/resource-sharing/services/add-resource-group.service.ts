import { IAddResourceToGroup } from '../usecases';
import { ResourceGroupEntity } from '../entities';
import { ResourceSharingRepositoryType } from '../repository';

export class AddResourceGroupService implements IAddResourceToGroup {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}
  async exec(resourceId: number, groupId: number): Promise<ResourceGroupEntity> {
    const resourceGroup = await this.resourceSharingRepository.create({
      resourceId,
      groupId,
    });
    return resourceGroup as ResourceGroupEntity;
  }
}
