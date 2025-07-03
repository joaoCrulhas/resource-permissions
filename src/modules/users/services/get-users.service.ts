import { UserEntity } from '../entities/user.entity';
import { IGetUsers } from '../usecases/get-user.usecase';
import { UserRepositoryType } from '../repository';

export class GetUsersService implements IGetUsers {
  constructor(private readonly userRepository: UserRepositoryType) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.fetchAll();
  }
}
