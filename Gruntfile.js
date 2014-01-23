module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', './controllers/*.js', './files/js/*.js'],
      options: {
        ignores: ['./files/lib/**/*.js'],
        jshintrc: '.jshintrc'
      }
    },

    bower: {
      install: {
        options: {
          targetDir: './files/lib/bower',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug'],
          ignoredFiles: ['node_modules/**'],
          env: {
            PORT: '3000'
          }
        }
      },
      dist: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug'],
          ignoredFiles: ['node_modules/**'],
          env: {
            PORT: '3001',
            NODE_ENV: 'distribution'
          }
        }
      }
    },

    requirejs: {
      compileJs: {
        options: {
          name: 'js/main',
          baseUrl: 'files',
          mainConfigFile: 'files/js/require.config.js',
          include: ['lib/bower/requirejs/require.js'],
          out: 'dist/js/app.js'
        }
      },
      compileCss: {
        options: {
          cssIn: 'files/css/all.css',
          out: 'dist/css/app.css'
        }
      }
    },

    exec: {

      test: {
        cmd: 'jshint'
      }

    }

  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', ['bower:install']);
  grunt.registerTask('serve', ['nodemon:dev']);
  grunt.registerTask('dist', ['jshint', 'requirejs:compileJs', 'requirejs:compileCss', 'nodemon:dist']);
  grunt.registerTask('test', ['jshint']);
};
