import { Resource } from '../../../../generated/prisma';

export class ResourceEntity {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  amountUsers?: number;
  constructor(name: string, description: string | null, id: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  static fromPrisma(resource: Resource) {
    return new ResourceEntity(resource.name, resource.description, resource.id);
  }
}
