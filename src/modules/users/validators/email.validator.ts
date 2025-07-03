import { IValidator } from '../../../validators';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';

export class EmailValidator implements IValidator<CreateUserRequestDto> {
  message: string = 'Invalid email';
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validate(data: CreateUserRequestDto): boolean {
    return this.emailRegex.test(data.email);
  }
}
