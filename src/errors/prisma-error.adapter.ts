import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { BadRequestError } from './base-errors/bad-request.error';

export const prismaErrorAdapter = (error: PrismaClientKnownRequestError) => {
  switch (error.code) {
    case 'P2002': {
      let target = error.meta?.target as Array<string>;
      target = target?.length > 0 && target ? target : [error.meta?.target as string];
      const fieldMessage = target
        ? `Unique constraint failed on the field(s): ${target}`
        : 'Unique constraint violation';
      throw new BadRequestError(fieldMessage);
    }

    case 'P2025': {
      throw new BadRequestError('The requested resource could not be found.');
    }

    case 'P2003': {
      throw new BadRequestError('Invalid reference to a related record.');
    }

    default: {
      throw new Error('An unexpected database error occurred.');
    }
  }
};
