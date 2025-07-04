export interface IAddResourceUser {
  /**
   * Add a user to a resource.
   * This is the use case for where the resource will be shared directly with a user.
   * @param resourceId The ID of the resource
   * @param userId The ID of the user to add
   * @returns A promise that resolves when the user is added to the resource
   */
  add(resourceId: number, userId: number): Promise<void>;
}
