module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/virtualFile.ts',
    '!src/virtualStats.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  resetMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  verbose: true
}
