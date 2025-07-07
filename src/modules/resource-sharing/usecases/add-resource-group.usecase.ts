import { AddResourceGroupResponseDto } from '../dtos';

/**
 * Represents the arguments needed to add a group to a resource
 */
export type AddResourceGroupArgs = {
  /** The unique identifier of the resource */
  resourceId: number;
  /** The unique identifier of the group to be added */
  groupId: number;
};

/**
 * Defines the contract for adding a group to a resource
 *
 * This interface should be implemented by any class that needs to provide
 * functionality for sharing a resource with all users in a specific group.
 */
export interface IAddResourceGroup {
  /**
   * Shares a resource with all members of a specified group
   *
   * @param input - The input parameters containing resource and group identifiers
   * @returns A promise that resolves when the resource has been successfully shared with the group
   * @throws {Error} If the group or resource is not found, or if the group already has access
   *
   */
  add(input: AddResourceGroupArgs): Promise<AddResourceGroupResponseDto>;
}
