import type { Config } from 'jest';
export default async (): Promise<Config> => {
  return {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    modulePaths: [
      '<rootDir>/src',
      '<rootDir>/node_modules',
      '<rootDir>/src/api',
      '<rootDir>/src/services',
      '<rootDir>/src/utils',
      '<rootDir>/src/utils/middleware',
    ],
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^@controllers/(.*)$': '<rootDir>/src/api/controllers/$1',
      '^@models/(.*)$': '<rootDir>/src/services/database/models/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '^@middleware/(.*)$': '<rootDir>/src/utils/middleware/$1',
      '^@routes/(.*)$': '<rootDir>/src/api/routes/$1',
    },
  };
};
