module.exports = function (grunt) {
  //http://thanpol.as/grunt/Grunt-with-express-server-and-Livereload/
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      web: {
        options: {
          script: 'backend/app.js',
        }
      },
    },
    watch: {
      frontend: {
        options: {
          livereload: true
        },
        files: [
          // triggering livereload when the .css file is updated
          // (compared to triggering when sass completes)
          // allows livereload to not do a full page refresh
          'frontend/static/styles/*.css',
          'frontend/templates/**/*.jade',
          'frontend/static/scripts/**/*.js',
          'frontend/static/img/**/*'
        ]
      },
      stylesSass: {
        files: [
          '!frontend/styles/sass-twitter-bootstrap/',
          'frontend/styles/**/*.scss'
        ],
        tasks: [
          'compass'
        ]
      },
      web: {
        files: [
          'backend/**/*.js',
          'config/*',
          'test/**/*.js',
        ],
        tasks: [
          'express:web'
        ],
        options: {
          nospawn: true, //Without this option specified express won't be reloaded
          atBegin: true,
        }
      }
    },
    parallel: {
      web: {
        options: {
          stream: true
        },
        tasks: [{
          grunt: true,
          args: ['watch:frontend']
        }, {
          grunt: true,
          args: ['watch:stylesSass']
        }, {
          grunt: true,
          args: ['watch:web']
        }]
      },
    }
  });
  grunt.registerTask('web', 'launch webserver and watch tasks', [
    'parallel:web',
  ]);

  grunt.registerTask('default', ['web']);
};
