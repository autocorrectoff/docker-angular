const isDocker = require('is-docker')();

module.exports = config => config.set({
  customLaunchers: {
    ChromeCustom: {
      base: 'ChromeHeadless',
      // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
      // more permissions than Docker allows by default)
      flags: isDocker ? ['--no-sandbox'] : []
    }
  },
  // This example uses mocha and chai, but we could use something else, jasmine for example
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage-istanbul-reporter'),
    require('@angular-devkit/build-angular/plugins/karma')
  ],
  client: {
    clearContext: false // leave Jasmine Spec Runner output visible in browser
  },
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, './coverage/dockerize-angular'),
    reports: ['html', 'lcovonly', 'text-summary'],
    fixWebpackSourcePaths: true
  },
  reporters: ['progress', 'kjhtml'],
  port: 9876,
  colors: true,
  logLevel: config.LOG_INFO,
  autoWatch: true,
  browsers: ['ChromeCustom'],
  singleRun: false,
  restartOnFileChange: true
});