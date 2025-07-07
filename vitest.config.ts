import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
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
