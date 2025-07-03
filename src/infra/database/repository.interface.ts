export interface IRepository<T = unknown> {
  create(data: Partial<T>): Promise<T>;
}
