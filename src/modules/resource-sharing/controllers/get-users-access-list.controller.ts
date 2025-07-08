import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { IGetUsersAccessList } from '../usecases';
import { GetUsersAccessListRequestDto } from '../dtos';
import { UserEntity } from '@users/entities/user.entity';

export type GetUsersAccessListControllerType = IController<
  GetUsersAccessListRequestDto,
  UserEntity[],
  { resourceId: number }
>;

export class GetUsersAccessListController implements GetUsersAccessListControllerType {
  constructor(private readonly getUsersAccessList: IGetUsersAccessList) {}

  async handle(
    _request: GetUsersAccessListRequestDto,
    params: { resourceId: number }
  ): Promise<HttpResponse<UserEntity[]>> {
    const response = await this.getUsersAccessList.exec(Number(params.resourceId));
    return {
      body: response,
      statusCode: StatusCode.OK,
    };
  }
}
