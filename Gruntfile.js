/* global module:false */
/* global require */
module.exports = function(grunt) {

  grunt.initConfig({
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
      sass: {
        files: ['style/**/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: ['style/**/*.css']
      },
      html: {
        files: ['index.html']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['connect', 'watch']);

};
