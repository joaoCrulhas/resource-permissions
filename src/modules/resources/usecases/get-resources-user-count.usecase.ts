import { ResourceEntity } from '../entities';

export interface IGetResourcesUserCount {
  exec(): Promise<ResourceEntity[]>;
}
