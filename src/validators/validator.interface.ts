export interface IValidator<T = unknown> {
  validate(data: T): void;
}
