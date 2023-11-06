module.exports = {
  preset: 'ts-jest',
  testRegex: '((\\.|/)(e2e|test|spec))\\.[jt]sx?$',
  verbose: true,
  clearMocks: true,
  testTimeout: 300000,
  coveragePathIgnorePatterns: ['/node_modules/', '/examples/', '/website/', '.*/__tests__/.*', '.*/testing/.*'],
};
