import { ResourceEntity } from '@resources/entities';
import { Resource, User } from '../../../../generated/prisma';
import { UserEntity } from '@users/entities';

export class ResourceUserEntity {
  resource: ResourceEntity;
  user: UserEntity;
  constructor(resource: ResourceEntity, user: UserEntity) {
    this.resource = resource;
    this.user = user;
  }
  static fromPrisma(resource: Resource, user: User): ResourceUserEntity {
    return new ResourceUserEntity(ResourceEntity.fromPrisma(resource), UserEntity.fromPrisma(user));
  }
}
