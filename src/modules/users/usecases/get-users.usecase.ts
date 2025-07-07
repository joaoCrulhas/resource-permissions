import { UserEntity } from '../entities/user.entity';

export interface IGetUsers {
  getUsers(withResourcesAmount: boolean): Promise<UserEntity[]>;
}
