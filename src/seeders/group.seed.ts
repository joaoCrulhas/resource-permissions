import { Group, PrismaClient } from '../../generated/prisma';
import { faker } from '@faker-js/faker';

export const groupSeed = async (prismaClient: PrismaClient, amount = 5): Promise<Group[]> => {
  console.log('Creating groups...');
  const response: Group[] = [];
  for (let i = 0; i < amount; i++) {
    const groupCreated = await prismaClient.group.create({
      data: {
        name: `${faker.airline.airline().name}_${i}`,
      },
    });
    console.log(JSON.stringify(groupCreated));
    response.push(groupCreated);
  }
  console.log(`Finished creating ${amount} groups`);
  return response;
};
