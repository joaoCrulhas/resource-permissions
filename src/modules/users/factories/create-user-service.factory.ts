import { PrismaClient } from '../../../../generated/prisma';
import { CreateUserService } from '../services';
import { createUserRepositoryFactory } from './create-user-repository.factory';

export const createUserServiceFactory = (prismaClient: PrismaClient): CreateUserService => {
  return new CreateUserService(createUserRepositoryFactory(prismaClient));
};
