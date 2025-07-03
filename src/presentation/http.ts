import { StatusCode } from './status-code.helper';

export type HttpResponse<T = unknown> = {
  statusCode: StatusCode;
  body: T;
};
