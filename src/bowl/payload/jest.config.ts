import { getProjectConfig } from '@websolutespa/test';

export default getProjectConfig();

/*
import { Config } from 'jest';

const config: Config = {
  verbose: false,
  silent: true,
  rootDir: __dirname,
  testTimeout: process.env.CI ? 10000 : 5000,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/***(?<!e2e).test.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': ['@swc/jest', {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }]
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  reporters: ['default', 'github-actions'],
  snapshotFormat: {
    printBasicPrototype: false,
  },
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/src/***.{js,jsx,ts,tsx}',
    '!<rootDir>/src/***.test.{js,jsx,ts,tsx}',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/jest.mock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest.mock.file.js',
  },
};

export default config;
*/
