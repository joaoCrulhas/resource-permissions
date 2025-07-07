import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { GetResourcesByUserRequestDto } from '../dtos';
import { ResourceEntity } from '../../resources/entities';
import { IGetResourcesByUser } from '../usecases';

export type GetResourcesByUserControllerType = IController<
  GetResourcesByUserRequestDto,
  ResourceEntity[]
>;

export class GetResourcesByUserController implements GetResourcesByUserControllerType {
  constructor(private readonly getResourcesByUserService: IGetResourcesByUser) {}
  async handle(request: GetResourcesByUserRequestDto): Promise<HttpResponse<ResourceEntity[]>> {
    const response = await this.getResourcesByUserService.getResourcesByUser(request.userId);
    return {
      body: response,
      statusCode: StatusCode.OK,
    };
  }
}
