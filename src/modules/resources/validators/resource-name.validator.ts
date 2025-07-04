import { IValidator } from '../../../validators';
import { CreateResourceRequestDto } from '../dtos';
import { BadRequestError } from '../../../errors';

export class ResourceNameValidator implements IValidator<CreateResourceRequestDto> {
  validate(input: CreateResourceRequestDto): void {
    if (!input.name || input.name.length === 0) {
      throw new BadRequestError('name is required');
    }
  }
}
