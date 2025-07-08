import { faker } from '@faker-js/faker';
import { Prisma } from 'generated/prisma';
import { UserEntity } from '@users/entities';

export class UserTestHelper {
  static createUserEntityMocked(input?: Partial<UserEntity>): UserEntity {
    const fName = input?.firstName ?? faker.person.firstName();
    const lName = input?.lastName ?? faker.person.lastName();
    const uName =
      input?.username ??
      faker.internet.username({
        firstName: fName,
        lastName: lName,
      });
    const email =
      input?.email ??
      faker.internet.email({
        firstName: fName,
        lastName: lName,
      });
    return {
      amountResources: input?.amountResources ?? faker.number.int(),
      createdAt: input?.createdAt ?? new Date(),
      email,
      firstName: fName,
      id: input?.id ?? faker.number.int(),
      lastName: lName,
      updatedAt: input?.updatedAt ?? new Date(),
      username: uName,
    };
  }
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
