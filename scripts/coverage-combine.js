const combine = require('istanbul-combine');

combine({
  dir: 'coverage',                       // output directory for combined report(s)
  pattern: '*/coverage/coverage-final.json',   // json reports to be combined
  print: 'summary',                      // print to the console (summary, detail, both, none)
  base: '/',                        // base directory for resolving absolute paths, see karma bug
  reporters: {
    "json": {},
    "lcov": {},
    "text-summary": {},
  }
});
