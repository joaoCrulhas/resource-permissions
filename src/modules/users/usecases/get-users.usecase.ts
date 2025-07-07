import { UserEntity } from '../entities/user.entity';

export interface IGetUsers {
  exec(withResourcesAmount: boolean): Promise<UserEntity[]>;
}
