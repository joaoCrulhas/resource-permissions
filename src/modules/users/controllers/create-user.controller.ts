import { IController } from '../../../presentation/controller.interface';
import { HttpResponse } from '../../../presentation/http';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { UserEntity } from '../entities/user.entity';
import { ICreateUser } from '../usecases';
import { StatusCode } from '../../../presentation/status-code.helper';

export class CreateUserController implements IController<CreateUserRequestDto, UserEntity> {
  constructor(private readonly createUserService: ICreateUser) {}
  async handle(request: CreateUserRequestDto): Promise<HttpResponse<UserEntity>> {
    const user = await this.createUserService.createUser(request);
    return {
      body: user,
      statusCode: StatusCode.CREATED,
    };
  }
}
