import { GroupEntity } from '@groups/entities';
import { UserEntity } from '@users/entities';
import { Group, User } from '../../../../../generated/prisma';

export class AddUserGroupResponseDto {
  group: GroupEntity;
  user: UserEntity;
  constructor(group: GroupEntity, user: UserEntity) {
    this.group = group;
    this.user = user;
  }

  static fromPrisma(user: User, group: Group): AddUserGroupResponseDto {
    return new AddUserGroupResponseDto(GroupEntity.fromPrisma(group), UserEntity.fromPrisma(user));
  }
}
