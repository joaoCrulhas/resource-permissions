import { UserEntity } from '@users/entities';
import { IGetUsers } from '@users/usecases';
import { UserRepositoryType } from '@users/repository';
import { IGetResourcesByUser } from '@resource-sharing/usecases';

export class GetUsersService implements IGetUsers {
  constructor(
    private readonly getResourcesByUser: IGetResourcesByUser,
    private readonly userRepository: UserRepositoryType
  ) {}

  async exec(withResourcesAmount: boolean): Promise<UserEntity[]> {
    const users = await this.userRepository.fetchAll();
    if (!withResourcesAmount) {
      return users;
    }
    for (const user of users) {
      user.amountResources = (await this.getResourcesByUser.exec(user.id)).length;
    }
    return users;
  }
}
