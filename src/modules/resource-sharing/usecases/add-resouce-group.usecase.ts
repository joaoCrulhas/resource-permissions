import { ResourceGroupEntity } from '../entities';

export interface IAddResourceToGroup {
  addResourceGroup(resourceId: number, groupId: number): Promise<ResourceGroupEntity>;
}
