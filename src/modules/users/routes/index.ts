import { FastifyInstance } from 'fastify';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { createUserControllerFactory } from '../factories/create-user-controller.factory';
import { PrismaSingleton } from '../../../infra/database/prisma-singleton';
import { BadRequestError, errorAdapter } from '../../../errors';
import { createUserValidatorFactory } from '../validators/create-user-validator.factory';

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/api/user',
    {
      preHandler: (req, res, done) => {
        const body = req.body as CreateUserRequestDto;
        const validators = createUserValidatorFactory();
        for (const validator of validators) {
          if (!validator.validate(body)) {
            throw new BadRequestError(validator.message);
          }
        }
        done();
      },
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
