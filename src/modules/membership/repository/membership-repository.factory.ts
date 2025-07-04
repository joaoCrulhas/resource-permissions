import { MembershipRepository, MembershipRepositoryType } from './membership.repository';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';

export const membershipRepositoryFactory = (): MembershipRepositoryType => {
  return new MembershipRepository(PrismaSingleton.getInstance());
};
