import { PrismaClient, Resource } from '../../generated/prisma';
import { ResourceTestHelper } from '../test';
import { faker } from '@faker-js/faker';

export const resourceSeed = async (prismaClient: PrismaClient, amount = 5): Promise<Resource[]> => {
  console.log('Creating users...');
  const response: Resource[] = [];
  for (let i = 0; i < amount; i++) {
    const { name, description } = ResourceTestHelper.createMockedResource({
      name: `${faker.food.dish()}_${i}`,
      description: faker.lorem.sentence(),
    });
    const resourceCreated = await prismaClient.resource.create({
      data: {
        name,
        description,
      },
    });
    console.log(JSON.stringify(resourceCreated));
    response.push(resourceCreated);
  }
  console.log(`Finished creating ${amount} resources`);
  return response;
};
