import { IAddUserToGroup } from '../usecases';
import { MembershipRepositoryType } from '../repository';
import { AddUserGroupResponseDto } from '@membership/dtos';

export class AddUserGroupService implements IAddUserToGroup {
  constructor(private readonly membershipRepository: MembershipRepositoryType) {}
  async exec(userId: number, groupId: number): Promise<AddUserGroupResponseDto> {
    return await this.membershipRepository.create({
      groupId,
      userId,
    });
  }
}
