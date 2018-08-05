module.exports = {
  displayName: "client",
  setupFiles: ['<rootDir>/test/setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
  ],
  collectCoverageFrom: [
    "<rootDir>/**/*.js",
    "!coverage/**/*",
    "!test/**/*.test.js",
    "!test/setup.js"
  ],
  testURL: 'http://localhost/',
  coverageReporters: [
    "json"
  ],
};
