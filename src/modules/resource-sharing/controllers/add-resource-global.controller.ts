import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceGlobalRequestDto } from '../dtos';
import { ResourceGlobalEntity } from '../entities';
import { IAddResourceGlobal } from '../usecases/add-resource-global.usecase';

export type AddResourceGlobalControllerType = IController<
  AddResourceGlobalRequestDto,
  ResourceGlobalEntity
>;

export class AddResourceGlobalController implements AddResourceGlobalControllerType {
  constructor(private readonly addResourceGlobal: IAddResourceGlobal) {}
  async handle(request: AddResourceGlobalRequestDto): Promise<HttpResponse<ResourceGlobalEntity>> {
    const response = await this.addResourceGlobal.exec({
      resourceId: request.resourceId,
    });
    return {
      statusCode: StatusCode.CREATED,
      body: response as ResourceGlobalEntity,
    };
  }
}
