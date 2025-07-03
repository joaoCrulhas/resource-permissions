import { IValidator } from '../validators';
import { CreateUserRequestDto } from '../modules/users/dtos/request/create-user-request.dto';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const fastifyPreHandlerAdapter = (validators: IValidator[]) => {
  return (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
    const body = req.body as CreateUserRequestDto;
    for (const validator of validators) {
      validator.validate(body);
    }
    done();
  };
};
