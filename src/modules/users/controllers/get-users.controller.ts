import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { UserEntity } from '../entities/user.entity';
import { IGetUsers } from '../usecases';
import { GetUsersRequestDto } from '../dtos';

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
