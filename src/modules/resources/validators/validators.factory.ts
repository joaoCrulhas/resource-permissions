import { IValidator } from '../../../validators';
import { ResourceNameValidator } from './resource-name.validator';
import { CreateResourceRequestDto } from '@resources/dtos';

export const createResourceValidatorFactory = (): IValidator<CreateResourceRequestDto>[] => {
  return [new ResourceNameValidator()];
};
