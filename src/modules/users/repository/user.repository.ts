import { IRepository } from '../../../infra/database';
import { UserEntity } from '@users/entities';
import { PrismaClient } from '../../../../generated/prisma';
import { CreateUserRequestDto } from '@users/dtos';

export type UserRepositoryType = IRepository<CreateUserRequestDto, UserEntity>;
export class UserRepository implements UserRepositoryType {
  constructor(private readonly prismaClient: PrismaClient) {}

  async fetchAll(): Promise<UserEntity[]> {
    return this.prismaClient.user.findMany();
  }

  async create(data: CreateUserRequestDto): Promise<UserEntity> {
    return this.prismaClient.user.create({
      data,
    });
  }
}
