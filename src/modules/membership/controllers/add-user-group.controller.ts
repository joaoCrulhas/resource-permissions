import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddUserGroupDto } from '../dtos';
import { IAddUserToGroup } from '../usecases';

export class AddUserGroupController implements IController<AddUserGroupDto, string> {
  constructor(private readonly addUserGroupService: IAddUserToGroup) {}

  async handle(request: AddUserGroupDto): Promise<HttpResponse<string>> {
    await this.addUserGroupService.add(request.userId, request.groupId);
    return {
      statusCode: StatusCode.CREATED,
      body: 'User added to group',
    };
  }
}
