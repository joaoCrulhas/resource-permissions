import { ResourceEntity } from '@resources/entities';

export interface IGetResourcesByUser {
  exec(userId: number): Promise<ResourceEntity[]>;
}
