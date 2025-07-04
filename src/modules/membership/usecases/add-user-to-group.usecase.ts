export interface IAddUserToGroup {
  add(userId: number, groupId: number): Promise<void>;
}
