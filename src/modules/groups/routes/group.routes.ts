import { FastifyInstance } from 'fastify';
import { errorAdapter } from '../../../errors';
import { fastifyPreHandlerAdapter } from '../../../presentation/fastify-pre-handler.adapter';
import { createGroupControllerFactory, getGroupsControllerFactory } from '../controllers';
import { CreateGroupRequestDto } from '../dtos';
import { groupValidatorsFactory } from '../validators';

export const groupRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering group routes`);
  fastify.get('/api/group', async (req, res) => {
    try {
      const getGroupsController = getGroupsControllerFactory();
      const response = await getGroupsController.handle();
      res.status(response.statusCode).send(response.body);
    } catch (e) {
      return errorAdapter(e);
    }
  });
  fastify.post(
    '/api/group',
    {
      preHandler: [fastifyPreHandlerAdapter(groupValidatorsFactory())],
    },
    async (req, res) => {
      try {
        const body = req.body as CreateGroupRequestDto;
        const createGroupController = createGroupControllerFactory();
        const response = await createGroupController.handle(body);
        res.status(response.statusCode).send(response.body);
      } catch (e: unknown) {
        return errorAdapter(e);
      }
    }
  );
  fastify.log.info(`Group routes registered`);
};
