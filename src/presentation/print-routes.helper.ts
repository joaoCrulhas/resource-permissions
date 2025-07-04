import { FastifyBaseLogger } from 'fastify';

export const printRoutes = (logger: FastifyBaseLogger, obj: Record<string, unknown>) => {
  const values = Object.values(obj);
  for (const value of values) {
    logger.info(`Registered route: ${value}`);
  }
};
