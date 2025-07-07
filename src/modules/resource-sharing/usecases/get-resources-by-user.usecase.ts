import { ResourceEntity } from '../../resources/entities';

export interface IGetResourcesByUser {
  getResourcesByUser(userId: number): Promise<ResourceEntity[]>;
}
