import { IValidator } from '../../../validators';
import { EmailValidator } from './email.validator';
import { FirstnameLastnameValidator } from './firstname-lastname.validator';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';

export const createUserValidatorFactory = (): IValidator<CreateUserRequestDto>[] => {
  const validators: IValidator[] = [];
  validators.push(new EmailValidator(), new FirstnameLastnameValidator());
  return validators;
};
