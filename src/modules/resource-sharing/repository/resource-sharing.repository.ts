import { PrismaClient } from '../../../../generated/prisma';
import { IRepository } from '../../../infra/database';
import { ResourceGroupEntity, ResourceUserEntity } from '../entities';
import { UserEntity } from '@users/entities';
import { ResourceEntity } from '@resources/entities';

export type ResourceResponse = ResourceGroupEntity | ResourceUserEntity;

interface IResourceSharingRepository {
  getUsersAccessList(resourceId: number): Promise<UserEntity[]>;
  getResourcesByUser(userId: number): Promise<ResourceEntity[]>;
}

export type ResourceSharingRepositoryType = IRepository<
  CreateResourceSharingArgs,
  ResourceResponse
> &
  IResourceSharingRepository;

export type CreateResourceSharingArgs = {
  resourceId: number;
  groupId?: number;
  userId?: number;
  isGlobal?: boolean;
  isIndividual?: boolean;
};

export class ResourceSharingRepository implements ResourceSharingRepositoryType {
  constructor(private readonly prisma: PrismaClient) {}

  async getResourcesByUser(userId: number): Promise<ResourceEntity[]> {
    const uniqueResourceMap = new Map<number, ResourceEntity>();
    const notInFilter: number[] = [];

    const resourceUsers = await this.prisma.resourceGroup.findMany({
      include: {
        resource: true,
      },
      where: {
        group: {
          userGroup: {
            some: {
              userId,
            },
          },
        },
      },
    });

    for (const { resource } of resourceUsers) {
      uniqueResourceMap.set(resource.id, ResourceEntity.fromPrisma(resource));
      notInFilter.push(resource.id);
    }

    const resourceByUser = await this.prisma.resourceUser.findMany({
      include: {
        resource: true,
      },
      where: {
        userId,
        NOT: {
          resourceId: {
            in: notInFilter,
          },
        },
      },
    });

    for (const { resource } of resourceByUser) {
      uniqueResourceMap.set(resource.id, ResourceEntity.fromPrisma(resource));
    }

    return Array.from(uniqueResourceMap.values());
  }

  async getUsersAccessList(resourceId: number): Promise<UserEntity[]> {
    const uniqueUsersMap = new Map<number, UserEntity>();
    const notInFilter: number[] = [];
    const usersGroupEntities = await this.prisma.resourceGroup.findMany({
      include: {
        group: {
          include: {
            userGroup: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      where: {
        resourceId,
      },
    });

    for (const { group } of usersGroupEntities) {
      for (const { user } of group.userGroup) {
        notInFilter.push(user.id);
        uniqueUsersMap.set(user.id, UserEntity.fromPrisma(user));
      }
    }

    const usersDirectEntities = await this.prisma.resourceUser.findMany({
      include: {
        user: true,
      },
      where: {
        resourceId,
        AND: {
          user: {
            NOT: {
              id: {
                in: notInFilter.map((userId) => userId),
              },
            },
          },
        },
      },
    });

    for (const { user } of usersDirectEntities) {
      uniqueUsersMap.set(user.id, UserEntity.fromPrisma(user));
    }

    return Array.from(uniqueUsersMap.values());
  }

  private async createUserResourceSharing(
    userId: number,
    resourceId: number,
    isIndividual?: boolean,
    isGlobal?: boolean
  ) {
    const resourceUser = await this.prisma.resourceUser.upsert({
      include: {
        resource: true,
        user: true,
      },
      where: {
        resourceId_userId: {
          resourceId,
          userId,
        },
      },
      create: {
        resourceId,
        userId,
        ...(isIndividual && { isIndividual }),
        ...(isGlobal && { isGlobal }),
      },
      update: {
        isIndividual: true,
        ...(isIndividual && { isIndividual }),
        ...(isGlobal && { isGlobal }),
      },
    });

    return ResourceUserEntity.fromPrisma(resourceUser.resource, resourceUser.user);
  }

  private async createGroupResourceSharing(groupId: number, resourceId: number) {
    const resourceGroup = await this.prisma.resourceGroup.create({
      include: {
        group: true,
        resource: true,
      },
      data: {
        group: {
          connect: {
            id: groupId,
          },
        },
        resource: {
          connect: {
            id: resourceId,
          },
        },
      },
    });
    return ResourceGroupEntity.fromPrisma(resourceGroup.resource, resourceGroup.group);
  }
  async create(data: CreateResourceSharingArgs): Promise<ResourceResponse> {
    if (data.groupId) {
      return this.createGroupResourceSharing(data.groupId, data.resourceId);
    }
    if (data.userId) {
      return await this.createUserResourceSharing(
        data.userId,
        data.resourceId,
        data.isIndividual,
        data.isGlobal
      );
    }

    throw new Error('Group or user is required');
  }

  fetchAll(): Promise<ResourceGroupEntity[]> {
    return Promise.resolve([]);
  }
}
