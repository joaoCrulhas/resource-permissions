export class GroupEntity {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(name: string, id: number) {
    this.id = id;
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
