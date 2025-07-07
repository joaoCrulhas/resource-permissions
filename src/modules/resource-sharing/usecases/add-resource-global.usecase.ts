import { ResourceGlobalEntity } from '../entities';

export type AddResourceGlobalArgs = {
  resourceId: number;
};
export interface IAddResourceGlobal {
  addGlobal(input: AddResourceGlobalArgs): Promise<ResourceGlobalEntity>;
}
