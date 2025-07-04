import { HttpResponse, IController } from '../../../presentation';
import { CreateResourceRequestDto } from '../dtos';
import { ResourceEntity } from '../entities';
import { ICreateResource } from '../usecases';

export class CreateResourceController
  implements IController<CreateResourceRequestDto, ResourceEntity>
{
  constructor(private readonly createResourceService: ICreateResource) {}
  async handle(request: CreateResourceRequestDto): Promise<HttpResponse<ResourceEntity>> {
    return {
      statusCode: 201,
      body: await this.createResourceService.create(request),
    };
  }
}
