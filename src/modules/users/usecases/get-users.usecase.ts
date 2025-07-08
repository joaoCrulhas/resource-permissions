import { UserEntity } from '@users/entities';

export interface IGetUsers {
  exec(withResourcesAmount: boolean): Promise<UserEntity[]>;
}
