import { UserEntity } from '@users/entities';

export interface IGetUsersAccessList {
  exec(resourceId: number): Promise<UserEntity[]>;
}
