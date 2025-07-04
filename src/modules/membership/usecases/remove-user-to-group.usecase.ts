export interface IRemoveUserToGroup {
  remove(userId: string, groupId: string): Promise<void>;
}
