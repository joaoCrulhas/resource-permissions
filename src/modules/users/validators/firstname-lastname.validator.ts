import { IValidator } from '../../../validators';
import { CreateUserRequestDto } from '../dtos';
import { BadRequestError } from '../../../errors';

export class FirstnameLastnameValidator implements IValidator<CreateUserRequestDto> {
  message: string = 'Invalid first name or last name';
  validate({ firstName, lastName }: CreateUserRequestDto): void {
    if (firstName.length === 0) {
      throw new BadRequestError('First name cannot be empty.');
    }
    if (lastName.length === 0) {
      throw new BadRequestError('Last name cannot be empty.');
    }
  }
}
