import { beforeAll, describe, expect, it } from 'vitest';
import { EmailValidator } from './email.validator';
import { UserTestHelper } from '../../../test/user-test.helper';

describe('EmailValidator', () => {
  let sut: EmailValidator;

  beforeAll(() => {
    sut = new EmailValidator();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should throw an error if the email is invalid', () => {
    const email = 'wrongEmailTest#gmail.com';
    const input = UserTestHelper.createUserInputPrisma({
      email,
    });
    expect(() => {
      sut.validate(input);
    }).toThrowError(`Invalid email: ${email}`);
  });

  it('should not throw an error if the email is valid', () => {
    const email = 'q4k0c@example.com';
    const input = UserTestHelper.createUserInputPrisma({
      email,
    });
    expect(() => {
      sut.validate(input);
    }).not.toThrow();
  });
});
