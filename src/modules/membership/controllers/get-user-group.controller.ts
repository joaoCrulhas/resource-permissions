import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { GetUsersGroupDto } from '../dtos';
import { UserEntity } from '../../users/entities/user.entity';
import { IGetUsersGroup } from '../usecases';

export class GetUserGroupController implements IController<GetUsersGroupDto, UserEntity[]> {
  constructor(private readonly getUsersGroupService: IGetUsersGroup) {}
  async handle(request: GetUsersGroupDto): Promise<HttpResponse<UserEntity[]>> {
    const users = await this.getUsersGroupService.execute(request.groupId);
    return {
      body: users,
      statusCode: StatusCode.OK,
    };
  }
}
