import { beforeAll, describe, expect, it } from 'vitest';
import { ResourceNameValidator } from '@resources/validators/index';
import { BadRequestError } from '@errors/base-errors/bad-request.error';

describe('ResourceNameValidator', () => {
  let sut: ResourceNameValidator;
  beforeAll(() => {
    sut = new ResourceNameValidator();
  });
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should throw a bad request error if the name is empty', () => {
    expect(() => {
      sut.validate({ name: '' });
    }).toThrowError(new BadRequestError('name is required'));
  });

  it('should not throw a bad request error if the name is not empty', () => {
    expect(() => {
      sut.validate({ name: 'any_name' });
    }).not.toThrowError(new BadRequestError('name is required'));
  });
});
