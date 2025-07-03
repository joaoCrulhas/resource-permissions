import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { prismaErrorAdapter } from './prisma-error.adapter';

export const errorAdapter = (error: unknown) => {
  if (error instanceof PrismaClientKnownRequestError) {
    prismaErrorAdapter(error);
  }
  throw error;
};
