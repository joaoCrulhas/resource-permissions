import { AddResourceUserArgs, IAddResourceUser } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { ResourceUserEntity } from '../entities';

export class AddResourceUserService implements IAddResourceUser {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}

  async exec(input: AddResourceUserArgs): Promise<ResourceUserEntity> {
    const response = await this.resourceSharingRepository.create({
      resourceId: input.resourceId,
      userId: input.userId,
      isIndividual: true,
    });
    return response as ResourceUserEntity;
  }
}
