import { HttpResponse, IController, StatusCode } from '../../../presentation';
import { AddResourceUserRequestDto } from '../dtos';
import { IAddResourceUser } from '../usecases';
import { ResourceUserEntity } from '../entities';

export type AddResourceUserControllerType = IController<
  AddResourceUserRequestDto,
  ResourceUserEntity
>;

export class AddResourceUserController implements AddResourceUserControllerType {
  constructor(private readonly addResourceUser: IAddResourceUser) {}
  async handle(request: AddResourceUserRequestDto): Promise<HttpResponse<ResourceUserEntity>> {
    const response = await this.addResourceUser.addResourceUser({
      userId: request.userId,
      resourceId: request.resourceId,
      ...(request.isGlobal && { isGlobal: request.isGlobal }),
      ...(request.isIndividual && { isIndividual: request.isIndividual }),
    });
    return {
      statusCode: StatusCode.CREATED,
      body: response as ResourceUserEntity,
    };
  }
}
