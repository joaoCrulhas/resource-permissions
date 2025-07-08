import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@config': resolve(__dirname, './src/config'),
      '@users': resolve(__dirname, './src/modules/users'),
      '@membership': resolve(__dirname, './src/modules/membership'),
      '@resource-sharing': resolve(__dirname, './src/modules/resource-sharing'),
      '@resources': resolve(__dirname, './src/modules/resources'),
      '@groups': resolve(__dirname, './src/modules/groups'),
      '@presentation': resolve(__dirname, './src/presentation'),
      '@errors': resolve(__dirname, './src/errors'),
      '@database': resolve(__dirname, './src/infra/database'),
    },
  },
  test: {
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
      threads: {
        singleThread: true,
      },
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'src/setup/**/*',
        'src/test/**/*',
        'globalSetup.ts',
        'node_modules/',
        'dist/',
        '**/__tests__/**',
        '**/entities/**',
        '**/dtos/**',
        '**/*.d.ts',
        '**/index.ts',
        '**/*.interface.ts',
        '**/*.usecase.ts',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    globalSetup: './src/test/globalSetup.ts',
  },
});
