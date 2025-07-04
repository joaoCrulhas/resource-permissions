import { ResourceEntity } from '../entities';
import { CreateResourceRequestDto } from '../dtos';

export interface ICreateResource {
  create(input: CreateResourceRequestDto): Promise<ResourceEntity>;
}
