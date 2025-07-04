export class ResourceEntity {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  constructor(name: string, description: string, id: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
