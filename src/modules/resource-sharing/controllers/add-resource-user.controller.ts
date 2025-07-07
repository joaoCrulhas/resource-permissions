import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceUserRequestDto, AddResourceUserResponseDto } from '../dtos';
import { IAddResourceUser } from '../usecases';

export type AddResourceUserControllerType = IController<
  AddResourceUserRequestDto,
  AddResourceUserResponseDto
>;
export class AddResourceUserController implements AddResourceUserControllerType {
  constructor(private readonly addResourceUser: IAddResourceUser) {}
  async handle(
    request: AddResourceUserRequestDto
  ): Promise<HttpResponse<AddResourceUserResponseDto>> {
    const response = await this.addResourceUser.add({
      resourceId: request.resourceId,
      userId: request.userId,
    });
    return {
      statusCode: StatusCode.CREATED,
      body: response,
    };
  }
}
