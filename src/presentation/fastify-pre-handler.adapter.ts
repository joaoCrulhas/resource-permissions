import { IValidator } from '../validators';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const fastifyPreHandlerAdapter = <T = unknown>(validators: IValidator[]) => {
  return (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
    const body = req.body as T;
    for (const validator of validators) {
      validator.validate(body);
    }
    done();
  };
};
