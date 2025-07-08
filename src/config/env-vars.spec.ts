import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getEnvVar } from '@config/get-env-vars';

describe('Environment Variables', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, PORT: '3005' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getEnvVar', () => {
    it('should return the value of an existing environment variable', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getEnvVar('TEST_VAR' as any)).toBe('test-value');
    });

    it('should throw an error when environment variable is missing', () => {
      delete process.env.TEST_VAR;
      expect(() => getEnvVar('TEST_VAR' as any)).toThrow('Missing environment variable: TEST_VAR');
    });
  });
});
