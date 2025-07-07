import { IRepository } from '../../../infra/database';
import { UserEntity } from '../entities/user.entity';
import { PrismaClient } from '../../../../generated/prisma';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';

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
