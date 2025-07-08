import { describe, expect, it } from 'vitest';
import { createResourceValidatorFactory } from '@resources/validators/validators.factory';

describe('ValidatorsFactory', () => {
  it('should return all validators that is be executed in create-resource controller', () => {
    const received = createResourceValidatorFactory();
    expect(received.length).toEqual(1);
  });
});
