import { beforeAll, describe, expect, it, vi } from 'vitest';
import { GetUsersService } from './get-users.service';
import { UserRepositoryType } from '../repository';
import { UserTestHelper } from '../../../test/user-test.helper';

const makeSut = () => {
  const userRepositoryMocked: UserRepositoryType = {
    create: vi.fn(),
    fetchAll: vi.fn(),
  };
  const sut = new GetUsersService(userRepositoryMocked);
  return {
    sut,
    userRepository: userRepositoryMocked,
  };
};
describe('GetUsersService', () => {
  let sut: GetUsersService;
  let userRepositoryMock: UserRepositoryType;
  beforeAll(() => {
    const suts = makeSut();
    sut = suts.sut;
    userRepositoryMock = suts.userRepository;
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(userRepositoryMock).toBeDefined();
  });

  it('should return a list of users', async () => {
    const expectedUsers = [UserTestHelper.createUserEntity()];
    vi.spyOn(userRepositoryMock, 'fetchAll').mockResolvedValue(expectedUsers);
    const users = await sut.getUsers();
    expect(users).toEqual(expectedUsers);
  });

  it('should throw an error if the repository fails', async () => {
    // Arrange
    const { sut, userRepository } = makeSut();
    const repositoryError = new Error('Database Error');
    vi.spyOn(userRepository, 'fetchAll').mockRejectedValue(repositoryError);

    await expect(sut.getUsers()).rejects.toThrow(repositoryError);
    expect(userRepository.fetchAll).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if the repository finds no users', async () => {
    vi.spyOn(userRepositoryMock, 'fetchAll').mockResolvedValue([]);
    const users = await sut.getUsers();
    expect(users).toEqual([]);
    expect(userRepositoryMock.fetchAll).toHaveBeenCalledTimes(1);
  });
});
