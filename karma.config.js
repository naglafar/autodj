const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: 'build',
      reporters: [
        { type: 'text-summary' },
        { type: 'html', subdir: 'coverage' }
      ]
    },
    files: [
      'testContext.js'
    ],
    frameworks: [
      'jasmine'
    ],
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],
    preprocessors: {
      'testContext.js': ['webpack', 'sourcemap', 'coverage']
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      module: webpackConfig.module
    }
  });
};
