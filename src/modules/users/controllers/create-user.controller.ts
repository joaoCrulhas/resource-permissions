import { HttpResponse, IController, StatusCode } from '@presentation/index';
import { CreateUserRequestDto } from '@users/dtos';
import { UserEntity } from '@users/entities';
import { ICreateUser } from '@users/usecases';

export class CreateUserController implements IController<CreateUserRequestDto, UserEntity> {
  constructor(private readonly createUserService: ICreateUser) {}
  async handle(request: CreateUserRequestDto): Promise<HttpResponse<UserEntity>> {
    const user = await this.createUserService.exec(request);
    return {
      body: user,
      statusCode: StatusCode.CREATED,
    };
  }
}
