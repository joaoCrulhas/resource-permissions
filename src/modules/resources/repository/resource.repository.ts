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
  fetchAll(): Promise<ResourceEntity[]> {
    return this.prisma.resource.findMany();
  }
}
