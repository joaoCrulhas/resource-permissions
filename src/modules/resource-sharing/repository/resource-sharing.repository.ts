import { IRepository } from '../../../infra/database';
import { AddResourceSharingArgs } from './repository.type';
import { ResourceScopeEnum, ResourceSharingEntity, ResourceSharingScopeEntity } from '../entities';
import { Prisma, PrismaClient } from '../../../../generated/prisma';

interface IResourceSharing {
  addScopeToResource(
    resourceSharingId: number,
    scope: ResourceScopeEnum
  ): Promise<ResourceSharingScopeEntity>;
  createMany(
    usersId: number[],
    resourceId: number,
    scope: ResourceScopeEnum,
    groupId?: number
  ): Promise<number>;
  findResourceSharingByGroup(resourceId: number, groupId: number): Promise<boolean>;
  findAllByResourceByScope(
    resourceId: number,
    scope: ResourceScopeEnum
  ): Promise<ResourceSharingEntity[]>;

  findResourceSharingByResourceAndUser(
    resourceId: number,
    userId: number
  ): Promise<ResourceSharingEntity | null>;
}

export type ResourceSharingRepositoryType = IRepository<
  AddResourceSharingArgs,
  ResourceSharingEntity
> &
  IResourceSharing;

export class ResourceSharingRepository implements ResourceSharingRepositoryType {
  constructor(private readonly prisma: PrismaClient) {}

  async findResourceSharingByResourceAndUser(
    resourceId: number,
    userId: number
  ): Promise<ResourceSharingEntity | null> {
    const response = await this.prisma.resourceSharing.findFirst({
      include: {
        resourceSharingScope: true,
      },
      where: {
        resourceId,
        userId,
      },
    });
    return response ? ResourceSharingEntity.fromPrisma(response) : null;
  }

  async addScopeToResource(
    resourceSharingId: number,
    scope: ResourceScopeEnum
  ): Promise<ResourceSharingScopeEntity> {
    const scopeCreated = await this.prisma.resourceSharingScope.create({
      data: {
        resourceSharingId,
        resourceSharingScope: scope,
      },
    });
    return ResourceSharingScopeEntity.fromPrisma(scopeCreated);
  }

  async findAllByResourceByScope(
    resourceId: number,
    scope: ResourceScopeEnum
  ): Promise<ResourceSharingEntity[]> {
    const response = await this.prisma.resourceSharing.findMany({
      include: {
        resourceSharingScope: true,
      },
      where: {
        resourceId,
        AND: {
          resourceSharingScope: {
            some: {
              resourceSharingScope: scope,
            },
          },
        },
      },
    });
    return response.map((element) => ResourceSharingEntity.fromPrisma(element));
  }

  async findResourceSharingByGroup(resourceId: number, groupId: number): Promise<boolean> {
    const response = await this.prisma.resourceSharing.count({
      where: {
        groupId,
        resourceId,
      },
    });
    return response > 0;
  }

  async createMany(
    usersId: number[],
    resourceId: number,
    scope: ResourceScopeEnum,
    groupId?: number
  ): Promise<number> {
    const createdMany: ResourceSharingEntity[] = [];
    const data: Prisma.ResourceSharingCreateManyInput[] = usersId.map((element) => {
      return {
        resourceId,
        userId: element,
        ...(groupId && { groupId: groupId }),
      };
    });

    for (const d of data) {
      const input: AddResourceSharingArgs = {
        resourceSharingScope: scope,
        resourceId: d.resourceId,
        userId: d.userId,
      };
      if (d.groupId) {
        input.groupId = d.groupId;
      }
      const response = await this.create(input);
      createdMany.push(response);
    }
    return createdMany.length;
  }

  async create(data: AddResourceSharingArgs): Promise<ResourceSharingEntity> {
    const resourceShared = await this.prisma.resourceSharing.create({
      include: {
        resourceSharingScope: true,
      },
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
        resource: {
          connect: {
            id: data.resourceId,
          },
        },
        ...(data.groupId && {
          group: {
            connect: {
              id: data.groupId,
            },
          },
        }),
        resourceSharingScope: {
          create: {
            resourceSharingScope: data.resourceSharingScope,
          },
        },
      },
    });
    return ResourceSharingEntity.fromPrisma(resourceShared);
  }
  fetchAll(): Promise<ResourceSharingEntity[]> {
    throw new Error('Method not implemented.');
  }
}
