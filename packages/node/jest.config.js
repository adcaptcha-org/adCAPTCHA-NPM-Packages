/** @type {import('ts-jest').JestConfigWithTsJest} **/
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const transform = {
  '^.+\\.ts$': 'ts-jest',
};
export const testPathIgnorePatterns = ['<rootDir>/node_modules/', '<rootDir>/dist/'];