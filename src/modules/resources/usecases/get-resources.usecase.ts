import { ResourceEntity } from '../entities';

export interface IGetResources {
  fetchAll(): Promise<ResourceEntity[]>;
}
