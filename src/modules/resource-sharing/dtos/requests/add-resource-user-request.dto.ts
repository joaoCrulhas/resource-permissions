export class AddResourceUserRequestDto {
  resourceId: number;
  userId: number;
  isGlobal: boolean;
  isIndividual: boolean;
  constructor(resourceId: number, userId: number, isGlobal: boolean, isIndividual: boolean) {
    this.resourceId = resourceId;
    this.userId = userId;
    this.isGlobal = isGlobal;
    this.isIndividual = isIndividual;
  }
}
