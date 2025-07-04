import { ICreateUser } from '../usecases';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { UserRepositoryType } from '../repository';

export class CreateUserService implements ICreateUser {
  constructor(private readonly userRepository: UserRepositoryType) {}
  async createUser(input: CreateUserRequestDto): Promise<UserEntity> {
    return await this.userRepository.create(input);
  }
}
