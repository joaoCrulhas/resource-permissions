import { describe, expect, it, vi } from 'vitest';
import { CreateUserService } from './create-user.service';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../entities/user.entity';
import { IRepository } from '../../../infra/database';
import { UserRepositoryType } from '../repository';

type SutTypes = {
  sut: CreateUserService;
  userRepository: IRepository<UserEntity>;
};
class UserRepositoryMock implements UserRepositoryType {
  fetchAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  async create(data: CreateUserRequestDto): Promise<UserEntity> {
    return new UserEntity(1, data.firstName, data.lastName, data.username, data.email);
  }
}

// This function will create a SUT(System Under Test) => the CreateUserService
const makeSut = (): SutTypes => {
  const userRepository: UserRepositoryMock = new UserRepositoryMock();
  return {
    userRepository,
    sut: new CreateUserService(userRepository),
  };
};

describe('CreateUserService', () => {
  it('should call the repository with correct arguments', async () => {
    const { sut, userRepository } = makeSut();
    const input = createUserInputDto();
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
    await sut.createUser(input);
    expect(spy).toHaveBeenCalledWith(input);
  });

  it('should throw an error if repository throws', async () => {
    const { sut, userRepository } = makeSut();
    const input = createUserInputDto();
    vi.spyOn(userRepository, 'create').mockRejectedValueOnce(new Error());
    const promise = sut.createUser(input);
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
    const input = createUserInputDto();
    const user = await sut.createUser(input);
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

function createUserInputDto(input?: Partial<CreateUserRequestDto>): CreateUserRequestDto {
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
