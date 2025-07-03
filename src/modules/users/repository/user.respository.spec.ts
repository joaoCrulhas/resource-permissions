import { beforeAll, describe, expect, it } from 'vitest';
import { UserRepository } from './user.repository';
import { PrismaClient } from '../../../../generated/prisma';
import { UserTestHelper } from '../../../test/user-test.helper';

const makeSut = (): UserRepository => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'file:./test.db',
      },
    },
  });
  return new UserRepository(prisma);
};
describe('UserRepository', () => {
  let sut: UserRepository;
  beforeAll(() => {
    sut = makeSut();
  });
  it('should create a user', async () => {
    const received = await sut.create(UserTestHelper.createUserInputPrisma());
    expect(received).toBeDefined();
  });
});
