import {
  ResourceScopeEnum as EnumPrisma,
  ResourceSharingScope,
} from '../../../../generated/prisma';

export enum ResourceScopeEnum {
  GLOBAL = 'GLOBAL',
  GROUP = 'GROUP',
  USER = 'USER',
}

const resourceScopeMap: Record<EnumPrisma, ResourceScopeEnum> = {
  [EnumPrisma.GLOBAL]: ResourceScopeEnum.GLOBAL,
  [EnumPrisma.GROUP]: ResourceScopeEnum.GROUP,
  [EnumPrisma.USER]: ResourceScopeEnum.USER,
};

export class ResourceSharingScopeEntity {
  id: number;
  resourceSharingScope: ResourceScopeEnum;
  constructor(id: number, resourceSharingScope: ResourceScopeEnum) {
    this.id = id;
    this.resourceSharingScope = resourceSharingScope;
  }

  static fromPrisma(resourceSharingScope: ResourceSharingScope): ResourceSharingScopeEntity {
    return new ResourceSharingScopeEntity(
      resourceSharingScope.id,
      resourceScopeMap[resourceSharingScope.resourceSharingScope]
    );
  }
}
