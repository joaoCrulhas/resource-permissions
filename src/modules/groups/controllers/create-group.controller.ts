import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '@groups/entities';
import { ICreateGroup } from '@groups/usecases';

export class CreateGroupController implements IController<CreateGroupRequestDto, GroupEntity> {
  constructor(private readonly createGroupService: ICreateGroup) {}
  async handle(request: CreateGroupRequestDto): Promise<HttpResponse<GroupEntity>> {
    return {
      statusCode: StatusCode.CREATED,
      body: await this.createGroupService.exec(request),
    };
  }
}
