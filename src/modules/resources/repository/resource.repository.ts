import { PrismaClient } from '../../../../generated/prisma';
import { IRepository } from '../../../infra/database';
import { CreateResourceRequestDto } from '../dtos';
import { ResourceEntity } from '../entities';

export type ResourceRepositoryType = IRepository<CreateResourceRequestDto, ResourceEntity>;
export class ResourceRepository implements ResourceRepositoryType {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: CreateResourceRequestDto): Promise<ResourceEntity> {
    return this.prisma.resource.create({
      data,
    });
  }
  async fetchAll(): Promise<ResourceEntity[]> {
    const usersAmount = new Set<number>(); // Use a Set to track unique IDs
    const resources = await this.prisma.resource.findMany({
      include: {
        resourceGroup: {
          include: {
            group: {
              include: {
                userGroup: {
                  include: {
                    user: {
                      select: {
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        resourceUser: {
          select: {
            userId: true,
          },
        },
      },
    });

    for (const resource of resources) {
      const resourceUsersId = resource.resourceUser.map((element) => element.userId);
      const resourceGroupsId = resource.resourceGroup.flatMap((resourceGroup) => {
        return resourceGroup.group.userGroup.map((userGroup) => {
          return userGroup.user.id;
        });
      });
      const combinedIdsForResource = [...resourceUsersId, ...resourceGroupsId];
      for (const userId of combinedIdsForResource) {
        if (!usersAmount.has(userId)) {
          usersAmount.add(userId);
        }
      }
    }

    return resources.map((element) => {
      const resourceEntity = ResourceEntity.fromPrisma(element);
      resourceEntity.amountUsers = usersAmount.size;
      return resourceEntity;
    });
  }
}
