import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  modulePaths: ['<rootDir>'],
  testEnvironmentOptions: {
    url: 'http://localhost',
    extraGlobals: ['__moduleBundler'],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.sx'],
};

export default config;
