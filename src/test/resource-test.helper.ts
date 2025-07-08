import { ResourceEntity } from '@resources/entities';
import { faker } from '@faker-js/faker';

export class ResourceTestHelper {
  static createMockedResource(input?: Partial<ResourceEntity>): ResourceEntity {
    const name: string = input?.name ?? faker.lorem.word();
    const description: string = input?.description ?? faker.lorem.word();
    const id: number = input?.id ?? faker.number.int();
    return new ResourceEntity(name, description, id);
  }
}
