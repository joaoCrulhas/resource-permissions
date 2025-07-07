import { Prisma } from '@prisma-generated/client';
import { faker } from '@faker-js/faker';

export class UserTestHelper {
  static createUserInputPrisma(input?: Partial<Prisma.UserCreateInput>): Prisma.UserCreateInput {
    const firstName = input?.firstName ?? faker.person.firstName();

    const lastName = input?.lastName ?? faker.person.lastName();

    const username =
      input?.username ??
      faker.internet.username({
        firstName,
        lastName,
      });

    const email =
      input?.email ??
      faker.internet.email({
        firstName,
        lastName,
      });

    return {
      firstName,
      lastName,
      username,
      email,
    };
  }
}
