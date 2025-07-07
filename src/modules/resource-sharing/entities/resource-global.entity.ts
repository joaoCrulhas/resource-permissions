export class ResourceGlobalEntity {
  resourceId: number;
  usersId: number[];
  constructor(resourceId: number, usersId: number[]) {
    this.resourceId = resourceId;
    this.usersId = usersId;
  }
}
