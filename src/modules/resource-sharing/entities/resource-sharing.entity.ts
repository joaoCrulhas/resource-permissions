import { ResourceSharing, ResourceSharingScope } from '../../../../generated/prisma';
import { ResourceSharingScopeEntity } from './resource-sharing-scope.entity';

export class ResourceSharingEntity {
  id: number;
  userId: number;
  resourceId: number;
  groupId?: number;
  createdAt: Date;
  updatedAt: Date;
  resourceSharingScope: Array<ResourceSharingScopeEntity>;
  constructor(
    id: number,
    userId: number,
    resourceId: number,
    resourceSharingScope: Array<ResourceSharingScopeEntity>,
    groupId?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.resourceId = resourceId;
    this.resourceSharingScope = resourceSharingScope;
    this.groupId = groupId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static fromPrisma(
    resourceSharing: ResourceSharing & { resourceSharingScope?: Array<ResourceSharingScope> }
  ): ResourceSharingEntity {
    const scopes = resourceSharing.resourceSharingScope
      ? resourceSharing.resourceSharingScope.map((element) =>
          ResourceSharingScopeEntity.fromPrisma(element)
        )
      : [];

    return new ResourceSharingEntity(
      resourceSharing.id,
      resourceSharing.userId,
      resourceSharing.resourceId,
      scopes
    );
  }
}
