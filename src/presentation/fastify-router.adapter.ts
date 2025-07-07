import { FastifyReply, FastifyRequest } from 'fastify';
import { IController } from './controller.interface';
import { errorAdapter } from '../errors';

export const fastifyRouterAdapter = <T = unknown, R = unknown, P = unknown>(
  controller: IController<T, R>
) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const body = req.body as T;
      const params = req.params as P;
      const response = await controller.handle(body, params);
      res.status(response.statusCode).send({ data: response.body as R });
    } catch (e: unknown) {
      return errorAdapter(e);
    }
  };
};
