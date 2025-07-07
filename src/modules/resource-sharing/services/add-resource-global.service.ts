import { ResourceGlobalEntity } from '../entities';
import { ResourceSharingRepositoryType } from '../repository';
import { AddResourceGlobalArgs, IAddResourceGlobal } from '../usecases/add-resource-global.usecase';
import { IGetAllUsers } from '../../users/usecases';

export class AddResourceGlobalService implements IAddResourceGlobal {
  constructor(
    private readonly getAllUsers: IGetAllUsers,
    private readonly resourceSharingRepository: ResourceSharingRepositoryType
  ) {}

  async addGlobal(input: AddResourceGlobalArgs): Promise<ResourceGlobalEntity> {
    const response: ResourceGlobalEntity = {
      resourceId: input.resourceId,
      usersId: [],
    };
    const users = await this.getAllUsers.getAll();
    for (const user of users) {
      await this.resourceSharingRepository.create({
        resourceId: input.resourceId,
        userId: user.id,
        isGlobal: true,
      });
      response.usersId.push(user.id);
    }
    return response;
  }
}
