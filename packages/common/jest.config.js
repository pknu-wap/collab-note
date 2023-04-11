module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node', // Use node for testing environment (jsdom, node, etc.)
  modulePathIgnorePatterns: ['<rootDir>/dist/'], // Ignore dist folder
  moduleDirectories: ['node_modules', 'src'], // Look for modules in node_modules and src
};
