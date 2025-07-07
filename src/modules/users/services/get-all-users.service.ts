import { UserEntity } from '../entities/user.entity';
import { IGetAllUsers } from '../usecases';
import { UserRepositoryType } from '../repository';

export class GetAllUsersService implements IGetAllUsers {
  constructor(private readonly userRepository: UserRepositoryType) {}
  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.fetchAll();
  }
}
