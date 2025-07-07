import { ResourceUserEntity } from '../entities';

export type AddResourceUserArgs = {
  resourceId: number;
  userId: number;
};
export interface IAddResourceUser {
  exec(input: AddResourceUserArgs): Promise<ResourceUserEntity>;
}
