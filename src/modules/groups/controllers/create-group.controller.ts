import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { CreateGroupRequestDto } from '../dtos';
import { GroupEntity } from '../entities/group.entity';
import { ICreateGroup } from '../usecases';

export class CreateGroupController implements IController<CreateGroupRequestDto, GroupEntity> {
  constructor(private readonly createGroupService: ICreateGroup) {}
  async handle(request: CreateGroupRequestDto): Promise<HttpResponse<GroupEntity>> {
    return {
      statusCode: StatusCode.CREATED,
      body: await this.createGroupService.create(request),
    };
  }
}
