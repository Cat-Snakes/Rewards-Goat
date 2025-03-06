export const testEnvironment = 'jest-environment-jsdom';
export const transform = {
  '^.+\\.[t|j]sx?$': 'babel-jest',
};
export const moduleFileExtensions = ['js', 'jsx'];
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const testMatch = ['**/tests/**/*.test.jsx', '**/?(*.)+(spec|test).jsx'];
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1', // Adjust this based on your project structure
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS imports for Jest
};
