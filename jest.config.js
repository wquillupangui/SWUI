/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  resetMocks: false,
  transformIgnorePatterns: ['\\.(css|scss|sass)$'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  setupFiles: ["jest-localstorage-mock"]
};