import { ResourceEntity } from '../entities';
import { CreateResourceRequestDto } from '../dtos';

export interface ICreateResource {
  exec(input: CreateResourceRequestDto): Promise<ResourceEntity>;
}
