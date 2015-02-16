module.exports = function(grunt) {

  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    buster: {
      test: {
        'config': 'buster.js',
        'color': 'none',
        'config-group': 'Browser'
      },
      server: {
        'port': '1111'
      }
    },
    jshint: {
      all: ['grunt.js', 'src/**/*.js', 'tests/**/*.js']
    },
    coveralls: {
      options: {
        src: 'coverage/lcov.info',
        force: false
      }
    }
  });

  //Loading grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-coveralls');


  // Tasks.
  grunt.registerTask('default', [ 'jshint', 'buster', 'uglify', 'coveralls']);

};