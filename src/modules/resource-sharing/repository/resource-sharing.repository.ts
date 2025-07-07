import { PrismaClient } from '../../../../generated/prisma';
import { IRepository } from '../../../infra/database';
import { ResourceGroupEntity, ResourceUserEntity } from '../entities';

export type ResourceResponse = ResourceGroupEntity | ResourceUserEntity;

export type ResourceSharingRepositoryType = IRepository<
  CreateResourceSharingArgs,
  ResourceResponse
>;

export type CreateResourceSharingArgs = {
  resourceId: number;
  groupId?: number;
  userId?: number;
  isGlobal?: boolean;
  isIndividual?: boolean;
};

export class ResourceSharingRepository implements ResourceSharingRepositoryType {
  constructor(private readonly prisma: PrismaClient) {}
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
