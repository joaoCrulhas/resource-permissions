import { FastifyInstance } from 'fastify';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { createUserControllerFactory } from '../factories/create-user-controller.factory';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.post('/api/user', async (req, res) => {
    try {
      const body = req.body as CreateUserRequestDto;
      const createUserController = createUserControllerFactory(PrismaSingleton.getInstance());
      const response = await createUserController.handle(body);
      res.status(response.statusCode).send(response.body);
    } catch (error: unknown) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
