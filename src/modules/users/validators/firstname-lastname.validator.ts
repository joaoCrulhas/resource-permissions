import { IValidator } from '../../../validators';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';

export class FirstnameLastnameValidator implements IValidator<CreateUserRequestDto> {
  message: string = 'Invalid first name or last name';
  validate({ firstName, lastName }: CreateUserRequestDto): boolean {
    return firstName.length > 0 && lastName.length > 0;
  }
}
