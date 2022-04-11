module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts{,x}'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup-tests.ts']
}