import { UserRepository } from '../repository/user.repository';
import { PrismaClient } from '../../../../generated/prisma';

export const createUserRepositoryFactory = (prismaClient: PrismaClient): UserRepository => {
  return new UserRepository(prismaClient);
};
