var config = exports;

config['Browser'] = {
  environment: 'browser',
  libs: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.radio/build/backbone.radio.js'
  ],
  sources: [
    'src/mastermind.js'
  ],
  tests: [
    'tests/**/*.js'
  ],
  testHelpers: ['tests/helper.js'],
  "buster-istanbul": {
    outputDirectory: "coverage",
    format: "lcov",
    excludes: ["**/*.json"]
  },
  extensions: [
    require('buster-istanbul')
  ]
};

config['Node'] = {
  environment: 'node',
  tests: [
    'tests/node/*.js'
  ]
};