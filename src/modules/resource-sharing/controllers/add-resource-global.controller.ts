import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceGlobalRequestDto, AddResourceGlobalResponseDto } from '../dtos';
import { IAddResourceGlobal } from '../usecases';

export type AddResourceGlobalControllerType = IController<
  AddResourceGlobalRequestDto,
  AddResourceGlobalResponseDto
>;
export class AddResourceGlobalController implements AddResourceGlobalControllerType {
  constructor(private readonly addResourceGlobal: IAddResourceGlobal) {}
  async handle({
    resourceId,
  }: AddResourceGlobalRequestDto): Promise<HttpResponse<AddResourceGlobalResponseDto>> {
    const usersAmount = await this.addResourceGlobal.add(resourceId);
    return {
      statusCode: StatusCode.CREATED,
      body: new AddResourceGlobalResponseDto(resourceId, usersAmount),
    };
  }
}
