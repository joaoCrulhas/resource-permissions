import { ResourceRepository, ResourceRepositoryType } from '@resources/repository';
import { PrismaSingleton } from '@database/prisma-singleton';

export const resourceRepositoryFactory = (): ResourceRepositoryType => {
  return new ResourceRepository(PrismaSingleton.getInstance());
};
