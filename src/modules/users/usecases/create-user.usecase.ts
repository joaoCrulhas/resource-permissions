import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { UserEntity } from '../entities/user.entity';

export interface ICreateUser {
  createUser(input: CreateUserRequestDto): Promise<UserEntity>;
}
