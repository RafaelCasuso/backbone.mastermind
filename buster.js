var config = exports;

config['Browser'] = {
  environment: 'browser',
  sources: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.radio/build/backbone.radio.js',
    'src/mastermind.js'
  ],
  tests: [
    'tests/**/*.js'
  ],
  testHelpers: ['tests/helper.js']
};
