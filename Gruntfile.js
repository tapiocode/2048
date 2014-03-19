/* global module:false */
/* global require */
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: ['js/**/*.js']
      }
    },
    connect: {
      server: {}
    },
    sass: {
      dist: {
        files: {
          'style/main.css': 'style/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['js'],
        tasks: ['jshint:js']
      },
      sass: {
        files: ['style/**/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: ['style/**/*.css']
      },
      html: {
        files: ['index.html']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // grunt.registerTask('default', ['jshint', 'connect', 'watch']);
  grunt.registerTask('default', ['connect', 'watch']);

};
