import { PrismaClient, User } from '../../generated/prisma';
import { UserTestHelper } from '../test';

export const userSeed = async (prismaClient: PrismaClient, amount = 5): Promise<User[]> => {
  console.log('Creating users...');
  const response: User[] = [];
  for (let i = 0; i < amount; i++) {
    const userCreated = await prismaClient.user.create({
      data: UserTestHelper.createUserInputPrisma(),
    });
    console.log(JSON.stringify(userCreated));
    response.push(userCreated);
  }
  console.log(`Finished creating ${amount} users`);
  return response;
};
