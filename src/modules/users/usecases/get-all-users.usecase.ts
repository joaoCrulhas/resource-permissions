import { UserEntity } from '../entities/user.entity';

export interface IGetAllUsers {
  getAll(): Promise<UserEntity[]>;
}
