import { describe, expect, it, vi } from 'vitest';
import { CreateUserService } from './create-user.service';
import { UserEntity } from '../entities/user.entity';
import { IRepository } from '../../../infra/database';
import { UserRepositoryType } from '../repository';
import { UserTestHelper } from '../../../test/user-test.helper';

type SutTypes = {
  sut: CreateUserService;
  userRepository: IRepository<UserEntity>;
};

// This function will create a SUT(System Under Test) => the CreateUserService
const makeSut = (): SutTypes => {
  const userRepository: UserRepositoryType = {
    fetchAll: vi.fn(),
    create: vi.fn(),
  };
  return {
    userRepository,
    sut: new CreateUserService(userRepository),
  };
};

describe('CreateUserService', () => {
  it('should call the repository with correct arguments', async () => {
    const { sut, userRepository } = makeSut();
    const input = UserTestHelper.createUserInputPrisma();
    const spy = vi.spyOn(userRepository, 'create');
    spy.mockImplementationOnce(() => {
      const mockedUser: UserEntity = new UserEntity(
        1,
        input.firstName,
        input.lastName,
        input.username,
        input.email
      );
      return Promise.resolve(mockedUser);
    });
    await sut.exec(input);
    expect(spy).toHaveBeenCalledWith(input);
  });

  it('should throw an error if repository throws', async () => {
    const { sut, userRepository } = makeSut();
    const input = UserTestHelper.createUserInputPrisma();
    vi.spyOn(userRepository, 'create').mockRejectedValueOnce(new Error());
    const promise = sut.exec(input);
    await expect(promise).rejects.toThrow();
  });

  it('should return the created user', async () => {
    const { sut, userRepository } = makeSut();
    const spy = vi.spyOn(userRepository, 'create');
    spy.mockImplementationOnce(() => {
      const mockedUser: UserEntity = new UserEntity(
        1,
        input.firstName,
        input.lastName,
        input.username,
        input.email
      );
      return Promise.resolve(mockedUser);
    });
    const input = UserTestHelper.createUserInputPrisma();
    const user = await sut.exec(input);
    const expected = new UserEntity(
      user.id,
      input.firstName,
      input.lastName,
      input.username,
      input.email
    );
    expect(user).toEqual(expected);
  });
});
