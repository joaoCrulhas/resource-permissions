import { IRepository } from '../../../infra/database';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { UserEntity } from '../entities/user.entity';

export type UserRepositoryType = IRepository<CreateUserRequestDto, UserEntity>;
