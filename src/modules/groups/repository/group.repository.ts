import { IRepository } from '@database/index';
import { CreateGroupRequestDto } from '@groups/dtos';
import { GroupEntity } from '@groups/entities';
import { PrismaClient } from '../../../../generated/prisma';

export type GroupRepositoryType = IRepository<CreateGroupRequestDto, GroupEntity>;
export class GroupRepository implements GroupRepositoryType {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateGroupRequestDto): Promise<GroupEntity> {
    return this.prisma.group.create({
      data,
    });
  }
  async fetchAll(): Promise<GroupEntity[]> {
    return this.prisma.group.findMany();
  }
}
