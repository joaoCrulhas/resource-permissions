import { StatusCode } from '../../presentation';

export class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCode.BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}
