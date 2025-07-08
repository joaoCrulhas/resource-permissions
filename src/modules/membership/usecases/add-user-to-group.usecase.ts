import { AddUserGroupResponseDto } from '@membership/dtos';

export interface IAddUserToGroup {
  exec(userId: number, groupId: number): Promise<AddUserGroupResponseDto>;
}
