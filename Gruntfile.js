/* global module:false */
/* global require */
module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      // By default, opens a server on http://localhost:8000
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
        // Using Chrome LiveReload extension 
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
