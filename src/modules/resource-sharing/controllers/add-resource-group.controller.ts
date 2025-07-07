import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceGroupRequestDto } from '../dtos';
import { IAddResourceToGroup } from '../usecases';
import { ResourceGroupEntity } from '../entities';

export type AddResourceGroupControllerType = IController<
  AddResourceGroupRequestDto,
  ResourceGroupEntity
>;

export class AddResourceGroupController implements AddResourceGroupControllerType {
  constructor(private readonly addResourceGroup: IAddResourceToGroup) {}
  async handle(request: AddResourceGroupRequestDto): Promise<HttpResponse<ResourceGroupEntity>> {
    const response = await this.addResourceGroup.exec(request.resourceId, request.groupId);
    return {
      statusCode: StatusCode.CREATED,
      body: response as ResourceGroupEntity,
    };
  }
}
