import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { IGetResourcesUserCount } from '../usecases';
import { ResourceEntity } from '../entities';

export type GetAllResourcesControllerType = IController<never, ResourceEntity[]>;

export class GetAllResourcesController implements GetAllResourcesControllerType {
  constructor(private readonly getAllResourcesUsers: IGetResourcesUserCount) {}

  async handle(_request: never): Promise<HttpResponse<ResourceEntity[]>> {
    const response = await this.getAllResourcesUsers.getResourcesUserCount();
    return {
      body: response,
      statusCode: StatusCode.OK,
    };
  }
}
