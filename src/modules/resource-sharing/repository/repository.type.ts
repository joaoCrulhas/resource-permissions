import { ResourceScopeEnum } from '../entities';

export type AddResourceSharingArgs = {
  resourceId: number;
  userId: number;
  groupId?: number;
  resourceSharingScope: ResourceScopeEnum;
};
