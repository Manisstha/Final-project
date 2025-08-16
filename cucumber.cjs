module.exports = {
  default: {
    // Point to your feature files
    paths: ['tests/bdd/features/**/*.feature'],

    // Load step definitions and support (world, hooks)
    require: [
      'tests/cucumber/steps/**/*.js',
      'tests/cucumber/support/**/*.js'
    ],

    // Keep CLI clean
    publishQuiet: true,

    // Formatters
    format: [
      'progress-bar'
      // To enable HTML report, install '@cucumber/html-formatter' and add:
      // 'html:cucumber-report.html'
    ],

    // Parallel run of scenarios
    parallel: 5,

    // Parameters available in World constructor
    worldParameters: {
      baseURL: process.env.BASE_URL || 'http://localhost:5173'
    }
  }
};
