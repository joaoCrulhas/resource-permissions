import { CreateUserRequestDto } from '@users/dtos';
import { UserEntity } from '@users/entities';

export interface ICreateUser {
  exec(input: CreateUserRequestDto): Promise<UserEntity>;
}
