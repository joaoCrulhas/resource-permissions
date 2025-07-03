import { CreateUserController } from '../controllers/create-user.controller';
import { createUserServiceFactory } from './create-user-service.factory';
import { PrismaClient } from '../../../../generated/prisma';

export const createUserControllerFactory = (prismaClient: PrismaClient): CreateUserController => {
  return new CreateUserController(createUserServiceFactory(prismaClient));
};
