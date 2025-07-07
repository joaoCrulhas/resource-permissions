import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { UserEntity } from '../entities/user.entity';
import { IGetUsers } from '../usecases';

export type GetUsersControllerType = IController<{ withResourcesAmount: boolean }, UserEntity[]>;
export class GetUsersController implements GetUsersControllerType {
  constructor(private readonly getUsersService: IGetUsers) {}
  async handle(request: { withResourcesAmount: boolean }): Promise<HttpResponse<UserEntity[]>> {
    const users = await this.getUsersService.getUsers(request.withResourcesAmount);
    return {
      body: users,
      statusCode: StatusCode.OK,
    };
  }
}
