module.exports = {
  setupFiles: ['<rootDir>/test/setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
  ],
  collectCoverageFrom: [
    "<rootDir>/**/*.js",
    "!test/**/*.test.js",
    "!coverage/**/*",
  ],
  testURL: 'http://localhost/'
};
