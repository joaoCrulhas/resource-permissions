import {
  ResourceSharingRepository,
  ResourceSharingRepositoryType,
} from './resource-sharing.repository';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';

export const resourceSharingRepositoryFactory = (): ResourceSharingRepositoryType => {
  return new ResourceSharingRepository(PrismaSingleton.getInstance());
};
