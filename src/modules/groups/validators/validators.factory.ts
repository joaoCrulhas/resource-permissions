import { IValidator } from '../../../validators';
import { CreateGroupRequestDto } from '../dtos';
import { GroupNameValidator } from './group-name.validator';

export const groupValidatorsFactory = (): IValidator<CreateGroupRequestDto>[] => {
  const validators: IValidator[] = [];
  validators.push(new GroupNameValidator());
  return validators;
};
