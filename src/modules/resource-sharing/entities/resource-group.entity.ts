import { ResourceEntity } from '@resources/entities';
import { GroupEntity } from '@groups/entities';
import { Group, Resource } from '../../../../generated/prisma';

export class ResourceGroupEntity {
  resource: ResourceEntity;
  group: GroupEntity;
  constructor(resource: ResourceEntity, group: GroupEntity) {
    this.resource = resource;
    this.group = group;
  }
  static fromPrisma(resource: Resource, group: Group): ResourceGroupEntity {
    return new ResourceGroupEntity(
      ResourceEntity.fromPrisma(resource),
      GroupEntity.fromPrisma(group)
    );
  }
}
