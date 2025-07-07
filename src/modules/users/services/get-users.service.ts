import { UserEntity } from '../entities/user.entity';
import { IGetUsers } from '../usecases';
import { UserRepositoryType } from '../repository';
import { IGetResourcesByUser } from '../../resource-sharing/usecases';

export class GetUsersService implements IGetUsers {
  constructor(
    private readonly getResourcesByUser: IGetResourcesByUser,
    private readonly userRepository: UserRepositoryType
  ) {}

  async getUsers(withResourcesAmount: boolean): Promise<UserEntity[]> {
    const users = await this.userRepository.fetchAll();
    if (!withResourcesAmount) {
      return users;
    }
    for (const user of users) {
      user.amountResources = (await this.getResourcesByUser.getResourcesByUser(user.id)).length;
    }
    return users;
  }
}
