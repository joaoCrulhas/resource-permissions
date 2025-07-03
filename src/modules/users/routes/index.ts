import { FastifyInstance } from 'fastify';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { createUserControllerFactory, getUsersControllerFactory } from '../controllers';
import { errorAdapter } from '../../../errors';
import { createUserValidatorFactory } from '../validators/create-user-validator.factory';
import { fastifyPreHandlerAdapter } from '../../../presentation/fastify-pre-handler.adapter';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.get('/api/user', async (req, res) => {
    try {
      const getUsersController = getUsersControllerFactory();
      const response = await getUsersController.handle();
      res.status(response.statusCode).send(response.body);
    } catch (e) {
      return errorAdapter(e);
    }
  });
  fastify.post(
    '/api/user',
    {
      preHandler: [fastifyPreHandlerAdapter(createUserValidatorFactory())],
    },
    async (req, res) => {
      try {
        const body = req.body as CreateUserRequestDto;
        const createUserController = createUserControllerFactory();
        const response = await createUserController.handle(body);
        res.status(response.statusCode).send(response.body);
      } catch (e: unknown) {
        return errorAdapter(e);
      }
    }
  );
};
