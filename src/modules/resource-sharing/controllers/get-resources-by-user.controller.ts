import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { GetResourcesByUserRequestDto } from '../dtos';
import { ResourceEntity } from '../../resources/entities';
import { IGetResourcesByUser } from '../usecases';

export type GetResourcesByUserControllerType = IController<
  GetResourcesByUserRequestDto,
  ResourceEntity[],
  { userId: number }
>;

export class GetResourcesByUserController implements GetResourcesByUserControllerType {
  constructor(private readonly getResourcesByUserService: IGetResourcesByUser) {}
  async handle(
    _request: GetResourcesByUserRequestDto,
    params: { userId: number }
  ): Promise<HttpResponse<ResourceEntity[]>> {
    const response = await this.getResourcesByUserService.exec(Number(params.userId));
    return {
      body: response,
      statusCode: StatusCode.OK,
    };
  }
}
