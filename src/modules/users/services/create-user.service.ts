import { ICreateUser } from '../usecases';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { IRepository } from '../../../infra/database';

export class CreateUserService implements ICreateUser {
  constructor(private readonly userRepository: IRepository<CreateUserRequestDto, UserEntity>) {}
  async createUser(input: CreateUserRequestDto): Promise<UserEntity> {
    return await this.userRepository.create(input);
  }
}
