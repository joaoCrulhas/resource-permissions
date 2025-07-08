import { UserRepository } from '@users/repository/user.repository';
import { PrismaSingleton } from '@database/prisma-singleton';

export const userRepositoryFactory = (): UserRepository => {
  const prisma = PrismaSingleton.getInstance();
  return new UserRepository(prisma);
};
