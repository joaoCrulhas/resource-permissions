import { PrismaClient } from '../../../../generated/prisma';
import { IRepository } from '../../../infra/database';
import { UserEntity } from '@users/entities';
import { AddUserGroupDto, AddUserGroupResponseDto } from '@membership/dtos';

interface IMembershipRepository {
  getUsersByGroupId(groupId: number): Promise<UserEntity[]>;
}

export type MembershipRepositoryType = IRepository<AddUserGroupDto, AddUserGroupResponseDto> &
  IMembershipRepository;
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

  async create(data: AddUserGroupDto): Promise<AddUserGroupResponseDto> {
    const membershipCreated = await this.prisma.userGroup.create({
      include: {
        user: true,
        group: true,
      },
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
    return AddUserGroupResponseDto.fromPrisma(membershipCreated.user, membershipCreated.group);
  }
  fetchAll(): Promise<AddUserGroupResponseDto[]> {
    throw new Error('Method not implemented.');
  }
}
