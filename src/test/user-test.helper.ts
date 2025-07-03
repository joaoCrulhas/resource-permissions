import { Prisma } from '../../generated/prisma';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../modules/users/entities/user.entity';

export class UserTestHelper {
  static createUserEntity(input?: Partial<Prisma.UserCreateInput>): UserEntity {
    return {
      createdAt: new Date(),
      email: input?.email ?? faker.internet.email(),
      firstName: input?.firstName ?? faker.person.firstName(),
      id: faker.number.int(),
      lastName: input?.lastName ?? faker.person.lastName(),
      updatedAt: new Date(),
      username: input?.username ?? faker.internet.username(),
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
