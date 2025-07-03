import { FastifyInstance } from 'fastify';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { createUserControllerFactory } from '../factories/create-user-controller.factory';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';
import { errorAdapter } from '../../../errors';
import { createUserValidatorFactory } from '../validators/create-user-validator.factory';
import { fastifyPreHandlerAdapter } from '../../../presentation/fastify-pre-handler.adapter';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/api/user',
    {
      preHandler: [fastifyPreHandlerAdapter(createUserValidatorFactory())],
    },
    async (req, res) => {
      try {
        const body = req.body as CreateUserRequestDto;
        const createUserController = createUserControllerFactory(PrismaSingleton.getInstance());
        const response = await createUserController.handle(body);
        res.status(response.statusCode).send(response.body);
      } catch (e: unknown) {
        return errorAdapter(e);
      }
    }
  );
};
