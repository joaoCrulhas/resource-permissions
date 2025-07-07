import { IAddResourceGlobal } from '../usecases';
import { IGetAllUsers } from '../../users/usecases';
import { ResourceSharingRepositoryType } from '../repository';
import { ResourceScopeEnum } from '../entities';

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
    const usersRemaining = await this.getUsersRemaining(resourceId);
    if (usersRemaining.length === 0) {
      return 0;
    }
    return await this.resourceSharingRepository.createMany(
      usersRemaining,
      resourceId,
      ResourceScopeEnum.GLOBAL
    );
  }
}
