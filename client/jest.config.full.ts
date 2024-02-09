import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^root/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^containers/(.*)$': '<rootDir>/src/containers/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less)$': '<rootDir>/mocks/fileMock.tsx',
    '\\.(css|less)$': '<rootDir>/mocks/fileMock.tsx',
  },
  modulePaths: ['<rootDir>'],
  testEnvironmentOptions: {
    url: 'http://localhost',
    extraGlobals: ['__moduleBundler'],
  },
  setupFilesAfterEnv: ['<rootDir>/src/utils/test-utils/index.tsx'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.sx'],
};

export default config;
