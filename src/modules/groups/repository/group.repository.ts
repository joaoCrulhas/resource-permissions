import { IRepository } from '../../../infra/database';
import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '../entities/group.entity';
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
