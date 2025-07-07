import { UserEntity } from '../../users/entities/user.entity';

export interface IGetUsersAccessList {
  getUsersAccessList(resourceId: number): Promise<UserEntity[]>;
}
