const withTM = require('next-transpile-modules')(['@shared']);

module.exports = {
  testEnvironment: 'jsdom', // Add this line to specify the test environment
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/out/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
