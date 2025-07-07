export class GetUsersRequestDto {
  withResourcesAmount: boolean;
  constructor(withResourcesAmount: boolean) {
    this.withResourcesAmount = withResourcesAmount;
  }
}
