'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'client/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['Gruntfile.js', 'lib/**/*.js', 'client/**/*.js', 'test/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/server/**/*.js']
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'client/',
        src: ['**/*.html'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['client/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },
      test: {
        src: ['test/client/**/*test.js'],
        dest:'test/test_bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    sass: {
      dev: {
        files: {
          'build/app.css': 'client/styles/app.scss'
        }
      }
    },

    open: {
      testrunner: {
        path: 'test/test.html'
      }
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('build:test', ['browserify:test', 'open:testrunner']);
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['build:dev', 'test']);
};
