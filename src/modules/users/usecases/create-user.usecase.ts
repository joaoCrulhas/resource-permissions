import { CreateUserRequestDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

export interface ICreateUser {
  exec(input: CreateUserRequestDto): Promise<UserEntity>;
}
