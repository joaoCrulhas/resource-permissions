import { describe, expect, it } from 'vitest';
import { prismaErrorAdapter } from './prisma-error.adapter';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { BadRequestError } from './base-errors/bad-request.error';

export class MockPrismaClientKnownRequestError extends Error {
  code: string;
  meta?: { target?: string | string[] };
  name: string = 'PrismaClientKnownRequestError';

  constructor(message: string, code: string, meta?: { target?: string | string[] }) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

describe('prismaErrorAdapter', () => {
  it('should throw BadRequestError for P2002 with array target', () => {
    const error = new MockPrismaClientKnownRequestError('Unique constraint failed', 'P2002', {
      target: ['email', 'username'],
    });
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      BadRequestError
    );
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      'Unique constraint failed on the field(s): email,username'
    );
  });

  it('should throw BadRequestError for P2002 with string target', () => {
    const error = new MockPrismaClientKnownRequestError('Unique constraint failed', 'P2002', {
      target: 'email',
    });
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      BadRequestError
    );
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      'Unique constraint failed on the field(s): email'
    );
  });

  it('should throw BadRequestError for P2002 without target', () => {
    const error = new MockPrismaClientKnownRequestError('Unique constraint failed', 'P2002');
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      BadRequestError
    );
  });

  it('should throw BadRequestError for P2025', () => {
    const error = new MockPrismaClientKnownRequestError('Record not found', 'P2025');
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      BadRequestError
    );
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      'The requested resource could not be found.'
    );
  });

  it('should throw BadRequestError for P2003', () => {
    const error = new MockPrismaClientKnownRequestError('Foreign key constraint failed', 'P2003');
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      BadRequestError
    );
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      'Invalid reference to a related record.'
    );
  });

  it('should throw a generic Error for unknown Prisma error codes', () => {
    const error = new MockPrismaClientKnownRequestError('Some other error', 'PXXX');
    expect(() => prismaErrorAdapter(error as PrismaClientKnownRequestError)).toThrow(
      'An unexpected database error occurred.'
    );
  });
});
