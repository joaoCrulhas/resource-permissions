import { UserEntity } from '../../users/entities/user.entity';

export interface IGetUsersGroup {
  execute(groupId: number): Promise<UserEntity[]>;
}
