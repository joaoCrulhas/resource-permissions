import { IValidator } from '../../../validators';
import { ResourceNameValidator } from './resource-name.validator';

export const createResourceValidatorFactory = (): IValidator[] => {
  return [new ResourceNameValidator()];
};
