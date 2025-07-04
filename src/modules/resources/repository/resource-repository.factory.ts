import { ResourceRepository, ResourceRepositoryType } from './resource.repository';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';

export const resourceRepositoryFactory = (): ResourceRepositoryType => {
  return new ResourceRepository(PrismaSingleton.getInstance());
};
