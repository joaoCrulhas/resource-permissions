import { UserEntity } from '../../users/entities/user.entity';

export interface IGetUsersGroup {
  exec(groupId: number): Promise<UserEntity[]>;
}
