import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { UserEntity } from '../entities/user.entity';
import { ICreateUser } from '../usecases';
import { errorAdapter } from '../../../errors';

export class CreateUserController implements IController<CreateUserRequestDto, UserEntity> {
  constructor(private readonly createUserService: ICreateUser) {}
  async handle(request: CreateUserRequestDto): Promise<HttpResponse<UserEntity>> {
    try {
      const user = await this.createUserService.createUser(request);
      return {
        body: user,
        statusCode: StatusCode.CREATED,
      };
    } catch (e: unknown) {
      return errorAdapter(e);
    }
  }
}
