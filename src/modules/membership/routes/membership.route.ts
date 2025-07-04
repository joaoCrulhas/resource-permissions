import { FastifyInstance } from 'fastify';
import { errorAdapter } from '../../../errors';
import { AddUserGroupDto } from '../dtos';
import { addUserGroupControllerFactory, getUsersGroupControllerFactory } from '../controllers';

export const membershipRoutes = (fastify: FastifyInstance) => {
  fastify.log.info(`Registering membership routes`);

  fastify.post(
    '/api/membership',
    {
      // preHandler: [fastifyPreHandlerAdapter(groupValidatorsFactory())],
    },
    async (req, res) => {
      try {
        const body = req.body as AddUserGroupDto;
        const addUserGroupController = addUserGroupControllerFactory();
        const response = await addUserGroupController.handle(body);
        res.status(response.statusCode).send(response.body);
      } catch (e: unknown) {
        return errorAdapter(e);
      }
    }
  );

  fastify.get<{ Params: { groupId: number } }>('/api/membership/:groupId', async (req, res) => {
    try {
      const getUserGroupController = getUsersGroupControllerFactory();
      const response = await getUserGroupController.handle({ groupId: req.params.groupId });
      res.status(response.statusCode).send(response.body);
    } catch (e) {
      return errorAdapter(e);
    }
  });
  fastify.log.info(`Membership routes registered`);
};
