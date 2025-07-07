import { ResourceGlobalEntity } from '../entities';

export type AddResourceGlobalArgs = {
  resourceId: number;
};
export interface IAddResourceGlobal {
  exec(input: AddResourceGlobalArgs): Promise<ResourceGlobalEntity>;
}
