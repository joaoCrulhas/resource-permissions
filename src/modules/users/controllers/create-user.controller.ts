import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { CreateUserRequestDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';
import { ICreateUser } from '../usecases';

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
