import { HttpResponse, IController, StatusCode } from '@presentation/index';
import { GroupEntity } from '@groups/entities/group.entity';
import { IGetGroups } from '@groups/usecases';

export class GetGroupsController implements IController<void, GroupEntity[]> {
  constructor(private readonly getGroupsService: IGetGroups) {}
  async handle(_request: void): Promise<HttpResponse<GroupEntity[]>> {
    return {
      statusCode: StatusCode.OK,
      body: await this.getGroupsService.exec(),
    };
  }
}
