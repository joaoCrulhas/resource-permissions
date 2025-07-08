import { PrismaClient } from '../../../../generated/prisma';
import { IRepository } from '../../../infra/database';
import { AddUserGroupDto } from '../dtos';
import { UserEntity } from '@users/entities';

interface IMembershipRepository {
  getUsersByGroupId(groupId: number): Promise<UserEntity[]>;
}

export type MembershipRepositoryType = IRepository<AddUserGroupDto, void> & IMembershipRepository;
export class MembershipRepository implements MembershipRepositoryType {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsersByGroupId(groupId: number): Promise<UserEntity[]> {
    const usersGroup = await this.prisma.userGroup.findMany({
      include: {
        user: true,
      },
      where: {
        groupId,
      },
    });
    return usersGroup.map((element) => element.user);
  }

  async create(data: AddUserGroupDto): Promise<void> {
    await this.prisma.userGroup.create({
      data: {
        group: {
          connect: {
            id: data.groupId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }
  fetchAll(): Promise<void[]> {
    throw new Error('Method not implemented.');
  }
}
