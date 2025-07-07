export class AddResourceUserRequestDto {
  resourceId: number;
  userId: number;
  constructor(resourceId: number, userId: number) {
    this.resourceId = resourceId;
    this.userId = userId;
  }
}
