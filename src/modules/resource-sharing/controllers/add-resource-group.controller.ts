import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceGroupRequestDto, AddResourceGroupResponseDto } from '../dtos';
import { IAddResourceGroup } from '../usecases';

export type AddResourceGroupControllerType = IController<
  AddResourceGroupRequestDto,
  AddResourceGroupResponseDto
>;

export class AddResourceGroupController implements AddResourceGroupControllerType {
  constructor(private readonly addResourceGroup: IAddResourceGroup) {}

  async handle(
    request: AddResourceGroupRequestDto
  ): Promise<HttpResponse<AddResourceGroupResponseDto>> {
    const response = await this.addResourceGroup.add({
      resourceId: request.resourceId,
      groupId: request.groupId,
    });
    return {
      statusCode: StatusCode.CREATED,
      body: response,
    };
  }
}
