module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript
  testEnvironment: 'node', // Use node for testing environment (jsdom, node, etc.)
  verbose: true, // Show test results
  modulePathIgnorePatterns: ['<rootDir>/dist/'], // Ignore dist folder
  moduleDirectories: ['node_modules', 'src'], // Look for modules in node_modules and src
};
