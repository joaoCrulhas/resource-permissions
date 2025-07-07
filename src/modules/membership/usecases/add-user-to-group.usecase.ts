export interface IAddUserToGroup {
  exec(userId: number, groupId: number): Promise<void>;
}
