export interface IValidator<T = unknown> {
  validate(data: T): boolean;
  message: string;
}
