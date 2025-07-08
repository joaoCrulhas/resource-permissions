import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceGlobalRequestDto } from '@resource-sharing/dtos';
import { ResourceGlobalEntity } from '@resource-sharing/entities';
import { IAddResourceGlobal } from '@resource-sharing/usecases';

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
