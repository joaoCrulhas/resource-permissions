export class AddResourceGroupResponseDto {
  usersAmount: number;
  resourceId: number;
  groupId: number;
  constructor(usersAmount: number, resourceId: number, groupId: number) {
    this.usersAmount = usersAmount;
    this.resourceId = resourceId;
    this.groupId = groupId;
  }
}
