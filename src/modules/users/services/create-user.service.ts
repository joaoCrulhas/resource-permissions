import { ICreateUser } from '@users/usecases';
import { UserEntity } from '@users/entities';
import { CreateUserRequestDto } from '@users/dtos';
import { UserRepositoryType } from '@users/repository';

export class CreateUserService implements ICreateUser {
  constructor(private readonly userRepository: UserRepositoryType) {}
  async exec(input: CreateUserRequestDto): Promise<UserEntity> {
    return await this.userRepository.create(input);
  }
}
