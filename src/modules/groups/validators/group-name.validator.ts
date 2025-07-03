import { IValidator } from '../../../validators';
import { CreateGroupRequestDto } from '../dtos';
import { BadRequestError } from '../../../errors';

export class GroupNameValidator implements IValidator<CreateGroupRequestDto> {
  validate(data: CreateGroupRequestDto): void {
    if (!data?.name) {
      throw new BadRequestError('Group name cannot be empty.');
    }
    if (data.name.length === 0) {
      throw new BadRequestError('Group name cannot be empty.');
    }
  }
}
