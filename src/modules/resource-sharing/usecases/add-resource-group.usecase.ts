export interface IAddResourceGroup {
  /**
   * Add a group to a resource.
   * This is the use case for where the resource will be shared with all users in a group.
   * @param resourceId The ID of the resource
   * @param groupId The ID of the group to add
   * @returns A promise that resolves when the group is added to the resource
   */
  add(resourceId: number, groupId: number): Promise<void>;
}
