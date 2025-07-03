import { GroupRepository, GroupRepositoryType } from './group.repository';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';

export const repositoryFactory = (): GroupRepositoryType => {
  return new GroupRepository(PrismaSingleton.getInstance());
};
