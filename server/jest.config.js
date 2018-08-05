module.exports = {
  "displayName": "server",
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
    "!<rootDir>/utils/migrations/**/*.js",
    "!<rootDir>/utils/seeders/**/*.js",
    "!coverage/**/*",
    "!test/**/*.test.js",
    "!test/setup.js"
  ],
  "testEnvironment": "node",
  "coverageReporters": [
    "json"
  ],
  transform: {},
};
