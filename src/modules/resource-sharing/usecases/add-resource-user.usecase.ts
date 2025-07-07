import { ResourceUserEntity } from '../entities';

export type AddResourceUserArgs = {
  resourceId: number;
  userId: number;
};
export interface IAddResourceUser {
  addResourceUser(input: AddResourceUserArgs): Promise<ResourceUserEntity>;
}
