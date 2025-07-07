import { ResourceEntity } from '../entities';

export interface IGetResourcesUserCount {
  getResourcesUserCount(): Promise<ResourceEntity[]>;
}
