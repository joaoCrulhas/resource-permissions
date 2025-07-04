import { beforeAll, describe, expect, it } from 'vitest';
import { FirstnameLastnameValidator } from './firstname-lastname.validator';
import { UserTestHelper } from '../../../test/user-test.helper';

describe('FirstnameLastnameValidator', () => {
  let sut: FirstnameLastnameValidator;

  beforeAll(() => {
    sut = new FirstnameLastnameValidator();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should throw an error if the firstName is empty', () => {
    const input = UserTestHelper.createUserInputPrisma();
    expect(() => {
      sut.validate({
        ...input,
        firstName: '',
      });
    }).toThrowError('First name cannot be empty.');
  });

  it('should throw an error if the lastName is empty', () => {
    const input = UserTestHelper.createUserInputPrisma();
    expect(() => {
      sut.validate({
        ...input,
        lastName: '',
      });
    }).toThrowError('Last name cannot be empty.');
  });

  it('should not throw an error if the firstName and lastName are not empty', () => {
    const input = UserTestHelper.createUserInputPrisma();
    expect(() => {
      sut.validate(input);
    }).not.toThrowError();
  });
});
