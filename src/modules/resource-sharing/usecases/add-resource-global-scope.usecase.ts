export interface IAddResourceGlobal {
  /**
   * Add a resource to the global scope.
   * This is the use case for where the resource will be shared with all users.
   * @param resourceId The ID of the resource
   * @returns A promise that resolves when the resource is added to the global scope
   */
  add(resourceId: number): Promise<number>;
}
