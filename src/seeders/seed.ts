import { PrismaClient } from '../../generated/prisma';
import { userSeed } from './user.seed';
import { groupSeed } from './group.seed';
import { resourceSeed } from './resource.seed';

(async () => {
  const prismaClient = new PrismaClient();
  const users = await userSeed(prismaClient);
  const groups = await groupSeed(prismaClient);
  const resources = await resourceSeed(prismaClient);
})();
