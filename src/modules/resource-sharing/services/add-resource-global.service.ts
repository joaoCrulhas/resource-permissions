import { IAddResourceGlobal } from '../usecases';
import { IGetAllUsers } from '../../users/usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { ResourceScopeEnum, ResourceSharingEntity } from '../entities';

export class AddResourceGlobalService implements IAddResourceGlobal {
  constructor(
    private readonly getAllUsersService: IGetAllUsers,
    private readonly resourceSharingRepository: ResourceSharingRepositoryType
  ) {}

  private async getUsersRemaining(resourceId: number): Promise<number[]> {
    const allUsers = (await this.getAllUsersService.getAll()).map((element) => element.id);
    const usersWithPermission = await this.resourceSharingRepository.findAllByResourceByScope(
      resourceId,
      ResourceScopeEnum.GLOBAL
    );
    return allUsers.filter(
      (element) => !usersWithPermission.find((user) => user.userId === element)
    );
  }

  async add(resourceId: number): Promise<number> {
    const resourceSharingEntity: ResourceSharingEntity[] = [];
    const usersRemaining = await this.getUsersRemaining(resourceId);
    if (usersRemaining.length === 0) {
      return 0;
    }

    for (const userId of usersRemaining) {
      const isSharedWithUser =
        await this.resourceSharingRepository.findResourceSharingByResourceAndUser(
          resourceId,
          userId
        );
      if (!isSharedWithUser) {
        const created = await this.resourceSharingRepository.create({
          resourceId: resourceId,
          userId,
          resourceSharingScope: ResourceScopeEnum.GLOBAL,
        });
        resourceSharingEntity.push(created);
        continue;
      }
      if (
        isSharedWithUser.resourceSharingScope.find(
          (element) => element.resourceSharingScope === ResourceScopeEnum.GLOBAL
        )
      ) {
        continue;
      }

      const createdScope = await this.resourceSharingRepository.addScopeToResource(
        isSharedWithUser.id,
        ResourceScopeEnum.GLOBAL
      );

      isSharedWithUser.resourceSharingScope.push(createdScope);
      resourceSharingEntity.push(isSharedWithUser);
    }

    return resourceSharingEntity.length;
  }
}
