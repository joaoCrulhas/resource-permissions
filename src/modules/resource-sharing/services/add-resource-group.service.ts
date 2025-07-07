import { AddResourceGroupArgs, IAddResourceGroup } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { IGetUsersGroup } from '../../membership/usecases';
import { ResourceScopeEnum, ResourceSharingEntity } from '../entities';
import { BadRequestError } from '../../../errors';
import { AddResourceGroupResponseDto } from '../dtos';

export class AddResourceGroupService implements IAddResourceGroup {
  constructor(
    private readonly getUserGroupsService: IGetUsersGroup,
    private readonly resourceSharingRepository: ResourceSharingRepositoryType
  ) {}
  async add(input: AddResourceGroupArgs): Promise<AddResourceGroupResponseDto> {
    const resourceSharingEntity: ResourceSharingEntity[] = [];
    // check if the resouce is already shared with the group
    const isShared = await this.resourceSharingRepository.findResourceSharingByGroup(
      input.resourceId,
      input.groupId
    );

    if (isShared) {
      throw new BadRequestError(
        ` Resource ${input.resourceId} is already shared with group ${input.groupId}`
      );
    }

    const usersId = (await this.getUserGroupsService.execute(input.groupId)).map(
      (element) => element.id
    );

    if (usersId.length === 0) {
      throw new BadRequestError(`Group ${input.groupId} has no users`);
    }

    for (const userId of usersId) {
      const isSharedWithUser =
        await this.resourceSharingRepository.findResourceSharingByResourceAndUser(
          input.resourceId,
          userId
        );
      if (!isSharedWithUser) {
        const created = await this.resourceSharingRepository.create({
          resourceId: input.resourceId,
          userId,
          groupId: input.groupId,
          resourceSharingScope: ResourceScopeEnum.GROUP,
        });
        resourceSharingEntity.push(created);
        continue;
      }
      if (
        isSharedWithUser.resourceSharingScope.find(
          (element) => element.resourceSharingScope === ResourceScopeEnum.GROUP
        )
      ) {
        continue;
      }
      const createdScope = await this.resourceSharingRepository.addScopeToResource(
        isSharedWithUser.id,
        ResourceScopeEnum.GROUP
      );
      isSharedWithUser.resourceSharingScope.push(createdScope);
      resourceSharingEntity.push(isSharedWithUser);
    }

    return {
      usersAmount: resourceSharingEntity.length,
      resourceId: input.resourceId,
      groupId: input.groupId,
    };
  }
}
