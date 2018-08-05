module.exports = {
  "moduleFileExtensions": [
    "js"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/test/setup.js",
  "testMatch": [
    "<rootDir>/**/test/**/*.test.js"
  ],
  "testPathIgnorePatterns": [
  ],
  "collectCoverageFrom": [
    "<rootDir>/**/*.js",
    "!test/**/*.test.js",
    "!coverage/**/*",
    "!<rootDir>/utils/migrations/**/*.js",
    "!<rootDir>/utils/seeders/**/*.js"
  ],
  "testEnvironment": "node",
  "coverageReporters": [
    "json",
    "lcov",
    "text-summary"
  ],
  transform: {},
};
