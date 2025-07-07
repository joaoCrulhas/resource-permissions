import { ResourceGroupEntity } from '../entities';

export interface IAddResourceToGroup {
  exec(resourceId: number, groupId: number): Promise<ResourceGroupEntity>;
}
