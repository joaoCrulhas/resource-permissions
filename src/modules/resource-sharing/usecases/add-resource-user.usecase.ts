import { ResourceSharingEntity } from '../entities';

/**
 * Represents the arguments needed to add a user to a resource
 */
export type AddResourceUserArgs = {
  /** The unique identifier of the resource */
  resourceId: number;
  /** The unique identifier of the user */
  userId: number;
};

/**
 * Defines the contract for adding a user to a resource
 *
 * This interface should be implemented by any class that needs to provide
 * functionality for adding a user to a resource with direct sharing.
 */
export interface IAddResourceUser {
  /**
   * Adds a user to a resource with direct sharing permissions
   *
   * @param input - The input parameters containing resource and user identifiers
   * @returns A promise that resolves when the user has been successfully added to the resource
   * @throws {Error} If the user or resource is not found, or if the user already has access
   */
  add(input: AddResourceUserArgs): Promise<ResourceSharingEntity>;
}
