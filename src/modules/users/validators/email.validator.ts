import { IValidator } from '../../../validators';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { BadRequestError } from '../../../errors';

export class EmailValidator implements IValidator<CreateUserRequestDto> {
  message: string = 'Invalid email';
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validate(data: CreateUserRequestDto): void {
    if (!this.emailRegex.test(data.email)) {
      throw new BadRequestError(`${this.message}: ${data.email}`);
    }
  }
}
