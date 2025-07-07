import { AddResourceUserArgs, IAddResourceUser } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { ResourceScopeEnum, ResourceSharingEntity } from '../entities';
import { BadRequestError } from '../../../errors';

export class AddResourceUserService implements IAddResourceUser {
  constructor(private readonly resourceSharingRepository: ResourceSharingRepositoryType) {}

  async add(input: AddResourceUserArgs): Promise<ResourceSharingEntity> {
    const hasScopedDefined = await this.resourceSharingRepository.findAllByResourceByScope(
      input.resourceId,
      ResourceScopeEnum.USER
    );

    if (hasScopedDefined.find((element) => element.userId === input.userId)) {
      throw new BadRequestError('Resource and Scope already defined');
    }

    const resourceSharing =
      await this.resourceSharingRepository.findResourceSharingByResourceAndUser(
        input.resourceId,
        input.userId
      );

    if (resourceSharing) {
      const scopeCreated = await this.resourceSharingRepository.addScopeToResource(
        resourceSharing.id,
        ResourceScopeEnum.USER
      );
      resourceSharing.resourceSharingScope.push(scopeCreated);
      return resourceSharing;
    }

    return await this.resourceSharingRepository.create({
      ...input,
      resourceSharingScope: ResourceScopeEnum.USER,
    });
  }
}
