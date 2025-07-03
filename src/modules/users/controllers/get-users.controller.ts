import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { UserEntity } from '../entities/user.entity';
import { IGetUsers } from '../usecases/get-user.usecase';

export class GetUsersController implements IController<void, UserEntity[]> {
  constructor(private readonly getUsersService: IGetUsers) {}
  async handle(_request: void): Promise<HttpResponse<UserEntity[]>> {
    const users = await this.getUsersService.getUsers();
    return {
      body: users,
      statusCode: StatusCode.OK,
    };
  }
}
