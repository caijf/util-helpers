// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');
const { COVERAGE_LOCAL } = process.env;

module.exports =
  COVERAGE_LOCAL === '1'
    ? {}
    : {
        coverageReporters: ['text', 'cobertura'],
        globals: {
          BUILD_VERSION: version
        }
      };
