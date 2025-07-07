import { UserEntity } from '../../users/entities/user.entity';
import { IGetUsersGroup } from '../usecases';
import { MembershipRepositoryType } from '../repository';

export class GetUserGroupService implements IGetUsersGroup {
  constructor(private readonly membershipRepository: MembershipRepositoryType) {}
  async exec(groupId: number): Promise<UserEntity[]> {
    return await this.membershipRepository.getUsersByGroupId(groupId);
  }
}
