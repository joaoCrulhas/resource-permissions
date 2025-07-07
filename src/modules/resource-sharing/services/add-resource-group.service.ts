import { AddResourceGroupArgs, IAddResourceGroup } from '../usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { IGetUsersGroup } from '../../membership/usecases';
import { ResourceScopeEnum } from '../entities';
import { BadRequestError } from '../../../errors';
import { AddResourceGroupResponseDto } from '../dtos';

export class AddResourceGroupService implements IAddResourceGroup {
  constructor(
    private readonly getUserGroupsService: IGetUsersGroup,
    private readonly resourceSharingRepository: ResourceSharingRepositoryType
  ) {}
  async add(input: AddResourceGroupArgs): Promise<AddResourceGroupResponseDto> {
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

    const response = await this.resourceSharingRepository.createMany(
      usersId,
      input.resourceId,
      ResourceScopeEnum.GROUP,
      input.groupId
    );
    return {
      usersAmount: response,
      resourceId: input.resourceId,
      groupId: input.groupId,
    };
  }
}
