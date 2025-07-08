import { ResourceGlobalEntity } from '@resource-sharing/entities';
import { ResourceSharingRepositoryType } from '@resource-sharing/repository';
import { AddResourceGlobalArgs, IAddResourceGlobal } from '@resource-sharing/usecases';
import { IGetUsers } from '@users/usecases';

export class AddResourceGlobalService implements IAddResourceGlobal {
  constructor(
    private readonly getUsers: IGetUsers,
    private readonly resourceSharingRepository: ResourceSharingRepositoryType
  ) {}

  async exec(input: AddResourceGlobalArgs): Promise<ResourceGlobalEntity> {
    const response: ResourceGlobalEntity = {
      resourceId: input.resourceId,
      usersId: [],
    };
    const users = await this.getUsers.exec(false);
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
