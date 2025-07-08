import { GroupRepository, GroupRepositoryType } from './group.repository';
import { PrismaSingleton } from '@database/prisma-singleton';

export const repositoryFactory = (): GroupRepositoryType => {
  return new GroupRepository(PrismaSingleton.getInstance());
};
