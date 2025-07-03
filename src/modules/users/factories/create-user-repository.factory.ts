import { UserRepository } from '../repository';
import { PrismaClient } from '../../../../generated/prisma';

export const createUserRepositoryFactory = (prismaClient: PrismaClient): UserRepository => {
  return new UserRepository(prismaClient);
};
