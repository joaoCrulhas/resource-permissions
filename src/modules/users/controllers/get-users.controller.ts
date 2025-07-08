import { HttpResponse, IController, StatusCode } from '@presentation/index';
import { UserEntity } from '@users/entities';
import { IGetUsers } from '@users/usecases';
import { GetUsersRequestDto } from '@users/dtos';

export type GetUsersControllerType = IController<GetUsersRequestDto, UserEntity[]>;
export class GetUsersController implements GetUsersControllerType {
  constructor(private readonly getUsersService: IGetUsers) {}
  async handle(request: GetUsersRequestDto): Promise<HttpResponse<UserEntity[]>> {
    const users = await this.getUsersService.exec(request.withResourcesAmount);
    return {
      body: users,
      statusCode: StatusCode.OK,
    };
  }
}
