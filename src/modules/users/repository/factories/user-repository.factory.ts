import { UserRepository } from '../index';
import { PrismaSingleton } from '../../../../infra/database/prisma-singleton';

export const userRepositoryFactory = (): UserRepository => {
  const prisma = PrismaSingleton.getInstance();
  return new UserRepository(prisma);
};
