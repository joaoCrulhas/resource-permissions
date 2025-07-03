import { HttpResponse } from './http';

/**
 * Interface representing a generic controller handler.
 *
 * @template T - The type of the input request.
 * @template R - The type of the response body.
 */
export interface IController<T = never, R = unknown> {
  /**
   * Handles the incoming request and returns an HTTP response.
   *
   * @param {T} request - The incoming request data.
   * @returns {Promise<HttpResponse<R>>} A promise resolving to an HTTP response containing data of type R.
   */
  handle(request: T): Promise<HttpResponse<R>>;
}
