import { UserEntity } from '@users/entities';

export interface IGetUsersGroup {
  exec(groupId: number): Promise<UserEntity[]>;
}
