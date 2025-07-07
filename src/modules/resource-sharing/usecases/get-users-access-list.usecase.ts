import { UserEntity } from '../../users/entities/user.entity';

export interface IGetUsersAccessList {
  exec(resourceId: number): Promise<UserEntity[]>;
}
