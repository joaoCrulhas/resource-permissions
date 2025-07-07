import { ICreateResource } from '../usecases';
import { ResourceRepositoryType } from '../repository';
import { CreateResourceRequestDto } from '../dtos';
import { ResourceEntity } from '../entities';

export class CreateResourceService implements ICreateResource {
  constructor(private readonly resourceRepository: ResourceRepositoryType) {}

  async exec(input: CreateResourceRequestDto): Promise<ResourceEntity> {
    return await this.resourceRepository.create(input);
  }
}
