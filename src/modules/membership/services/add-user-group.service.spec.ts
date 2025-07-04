import { beforeAll, describe, expect, it, vi } from 'vitest';
import { AddUserGroupService } from './add-user-group.service';
import { MembershipRepositoryType } from '../repository';

describe('AddUserGroupService', () => {
  let sut: AddUserGroupService;

  const membershipRepositoryMock: MembershipRepositoryType = {
    getUsersByGroupId: vi.fn(),
    create: vi.fn(),
    fetchAll: vi.fn(),
  };

  beforeAll(() => {
    sut = new AddUserGroupService(membershipRepositoryMock);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(membershipRepositoryMock).toBeDefined();
  });

  it('should call the membership repository with correct params', async () => {
    const spy = vi.spyOn(membershipRepositoryMock, 'create');
    await sut.add(1, 1);
    expect(spy).toHaveBeenCalledWith({
      groupId: 1,
      userId: 1,
    });
  });

  it('should throw an error if the repository fails', async () => {
    vi.spyOn(membershipRepositoryMock, 'create').mockImplementationOnce(() => {
      throw new Error('Database Error');
    });
    await expect(sut.add(1, 1)).rejects.toThrow();
  });
});
