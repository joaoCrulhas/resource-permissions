import { MembershipRepository, MembershipRepositoryType } from '@membership/repository';
import { PrismaSingleton } from '@database/prisma-singleton';

export const membershipRepositoryFactory = (): MembershipRepositoryType => {
  return new MembershipRepository(PrismaSingleton.getInstance());
};
