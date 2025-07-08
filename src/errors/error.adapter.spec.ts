import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorAdapter } from '@errors/error.adapter';
import { prismaErrorAdapter } from '@errors/prisma-error.adapter';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';

vi.mock('./prisma-error.adapter', () => ({
  prismaErrorAdapter: vi.fn(),
}));

describe('Error Adapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should re-throw a non-PrismaClientKnownRequestError', () => {
    const genericError = new Error('Something went wrong');
    expect(() => errorAdapter(genericError)).toThrow(genericError);
    expect(prismaErrorAdapter).not.toHaveBeenCalled();
  });
  it('should re-throw a PrismaClientKnownRequestError and call prismaErrorAdapter', () => {
    const prismaError = new PrismaClientKnownRequestError('Operation failed', {
      code: 'P2002',
      clientVersion: '4.0.0',
    });

    expect(() => errorAdapter(prismaError)).toThrow(prismaError);
    expect(prismaErrorAdapter).toHaveBeenCalledTimes(1);
    expect(prismaErrorAdapter).toHaveBeenCalledWith(prismaError);
  });

  it('should always re-throw the original error', () => {
    const customError = new TypeError('Invalid type');
    expect(() => errorAdapter(customError)).toThrow(customError);
    expect(prismaErrorAdapter).not.toHaveBeenCalled();

    const anotherPrismaError = new PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '4.0.0',
    });
    expect(() => errorAdapter(anotherPrismaError)).toThrow(anotherPrismaError);
    expect(prismaErrorAdapter).toHaveBeenCalledWith(anotherPrismaError);
  });
});
