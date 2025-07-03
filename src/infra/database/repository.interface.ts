export interface IRepository<T = unknown, R = unknown> {
  create(data: T): Promise<R>;
  fetchAll(): Promise<R[]>;
}
