import { UserEntity } from '../entities/user.entity';

export interface IGetUsers {
  getUsers(): Promise<UserEntity[]>;
}
