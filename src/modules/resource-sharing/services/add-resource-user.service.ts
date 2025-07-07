import { AddResourceUserArgs, IAddResourceUser } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { ResourceScopeEnum, ResourceSharingEntity } from '../entities';
import { BadRequestError } from '../../../errors';

export class AddResourceUserService implements IAddResourceUser {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}
  async add(input: AddResourceUserArgs): Promise<ResourceSharingEntity> {
    const hasPermission = await this.resourceSharingRepository.findAllByResourceByScope(
      input.resourceId,
      ResourceScopeEnum.USER
    );

    if (hasPermission.find((element) => element.userId === input.userId)) {
      throw new BadRequestError('User already has access');
    }

    return await this.resourceSharingRepository.create({
      ...input,
      resourceSharingScope: ResourceScopeEnum.USER,
    });
  }
}
