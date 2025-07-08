import { beforeAll, describe, expect, it, vi } from 'vitest';
import { GetUsersService } from './get-users.service';
import { IGetResourcesByUser } from '@resource-sharing/usecases';
import { userRepositoryFactory, UserRepositoryType } from '../repository';
import { ResourceEntity } from '@resources/entities';
import { ResourceTestHelper } from '../../../test';

describe('GetUsersService', () => {
  let sut: GetUsersService;
  let getResourcesByUserMock: IGetResourcesByUser;
  let userRepository: UserRepositoryType;
  beforeAll(() => {
    userRepository = userRepositoryFactory();
    getResourcesByUserMock = {
      exec: vi.fn(),
    };
    sut = new GetUsersService(getResourcesByUserMock, userRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(getResourcesByUserMock).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should not call the getResourcesByUserMock if withResourcesAmount is false', async () => {
    const aSpy = vi.spyOn(getResourcesByUserMock, 'exec');
    await sut.exec(false);
    expect(aSpy).not.toHaveBeenCalled();
  });

  it('should call the getResourcesByUserService if the withResourcesAmount is true', async () => {
    const aSpy = vi.spyOn(getResourcesByUserMock, 'exec');
    const mockedSpyReturn: ResourceEntity[] = [ResourceTestHelper.createMockedResource()];
    aSpy.mockResolvedValue(mockedSpyReturn);
    await sut.exec(true);
    expect(aSpy).toHaveBeenCalled();
  });
});
