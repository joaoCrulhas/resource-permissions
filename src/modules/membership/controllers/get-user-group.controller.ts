import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { GetUsersByGroupParams, GetUsersGroupDto } from '../dtos';
import { UserEntity } from '@users/entities/user.entity';
import { IGetUsersGroup } from '../usecases';

export type GetUserGroupControllerType = IController<
  GetUsersGroupDto,
  UserEntity[],
  GetUsersByGroupParams
>;

export class GetUserGroupController implements GetUserGroupControllerType {
  constructor(private readonly getUsersGroupService: IGetUsersGroup) {}
  async handle(
    _request: GetUsersGroupDto,
    params: GetUsersByGroupParams
  ): Promise<HttpResponse<UserEntity[]>> {
    const users = await this.getUsersGroupService.exec(Number(params.groupId));
    return {
      body: users,
      statusCode: StatusCode.OK,
    };
  }
}
