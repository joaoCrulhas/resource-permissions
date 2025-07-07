export class GetResourcesByUserRequestDto {
  userId: number;
  constructor(userId: number) {
    this.userId = userId;
  }
}
