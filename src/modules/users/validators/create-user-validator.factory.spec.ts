import { describe, expect, it } from 'vitest';
import * as createUserValidatorFactory from './create-user-validator.factory';

describe('CreateUserValidatorFactory', () => {
  it('should return all validators to be executed in create-user controller', () => {
    const received = createUserValidatorFactory.createUserValidatorFactory();
    expect(received.length).toEqual(2);
  });
});
