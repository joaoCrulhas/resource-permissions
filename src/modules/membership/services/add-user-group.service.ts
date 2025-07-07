import { IAddUserToGroup } from '../usecases';
import { MembershipRepositoryType } from '../repository';

export class AddUserGroupService implements IAddUserToGroup {
  constructor(private readonly membershipRepository: MembershipRepositoryType) {}
  async exec(userId: number, groupId: number): Promise<void> {
    await this.membershipRepository.create({
      groupId,
      userId,
    });
  }
}
