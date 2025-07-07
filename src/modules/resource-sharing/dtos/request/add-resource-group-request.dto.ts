export class AddResourceGroupRequestDto {
  resourceId: number;
  groupId: number;
  constructor(resourceId: number, groupId: number) {
    this.resourceId = resourceId;
    this.groupId = groupId;
  }
}
