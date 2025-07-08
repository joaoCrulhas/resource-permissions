import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddUserGroupDto } from '../dtos';
import { IAddUserToGroup } from '../usecases';
import { AddUserGroupResponseDto } from '@membership/dtos/response/add-user-group-response.dto';

export type AddUserGroupControllerType = IController<AddUserGroupDto, AddUserGroupResponseDto>;
export class AddUserGroupController implements AddUserGroupControllerType {
  constructor(private readonly addUserGroupService: IAddUserToGroup) {}

  async handle(request: AddUserGroupDto): Promise<HttpResponse<AddUserGroupResponseDto>> {
    const body = await this.addUserGroupService.exec(request.userId, request.groupId);
    return {
      statusCode: StatusCode.CREATED,
      body,
    };
  }
}
