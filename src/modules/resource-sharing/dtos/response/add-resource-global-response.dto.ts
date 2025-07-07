export class AddResourceGlobalResponseDto {
  resourceId: number;
  usersAmount: number;
  constructor(resourceId: number, usersAmount: number) {
    this.resourceId = resourceId;
    this.usersAmount = usersAmount;
  }
}
