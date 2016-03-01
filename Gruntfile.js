// Generated on 2014-04-02 using generator-webapp 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: {
      // Configurable paths
      app: 'app',
      dist: 'dist',
      version: '4.5.3'
    },

    // postcss plugin for autoprefixer
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 10 versions']
          })
        ]
      },
      dist: {
        src: 'dist/styles/*.css'
      }
    },

    browserSync: {
      bsFiles: {
        src: [
          'app/styles/**/*.scss',
          '*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "app/"
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      sass: {
        files: 'app/styles/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      // jstest: {
      //   files: ['test/spec/{,*/}*.js'],
      //   tasks: ['test:watch']
      // },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      // compass: {
      //   files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
      //   tasks: ['compass:server', 'autoprefixer']
      // },
      styles: {
         files: ['<%= config.app %>/styles/{,*/}*.css'],
         tasks: ['newer:copy:styles', 'autoprefixer']
      }

    },
    sass: {

      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles/',
          src: ['*.scss'],
          dest: '<%= config.app %>/styles/',
          ext: '.css'
        }]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= config.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/img/generated',
        imagesDir: '<%= config.app %>/img',
        javascriptsDir: '<%= config.app %>/scripts',
        fontsDir: '<%= config.app %>/fonts',
        importPath: '<%= config.app %>/vendor',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= config.dist %>/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 6 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/img/{,*/}*.*',
            '<%= config.dist %>/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: ['<%= config.app %>/homepage-wide.html', '<%= config.app %>/homepage.html', '<%= config.app %>/widgets.html', '<%= config.app %>/decorator-js-client.html']
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/img']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/img'
        }]
      },
      cssImages: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/styles/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },


    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //     dist: {
    //         files: {
    //             '<%= config.dist %>/styles/_bootstrap.css': [
    //                 '.tmp/styles/{,*/}*.css',
    //                 '<%= config.app %>/styles/{,*/}*.css'
    //             ]
    //         }
    //     }
    // },
    // uglify: {
    //     dist: {
    //         files: {
    //             '<%= config.dist %>/scripts/scripts.js': [
    //                 '<%= config.dist %>/scripts/scripts.js'
    //             ]
    //         }
    //     }
    // },
    // concat: {
    //     dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'img/{,*/}*.webp',
            '{,*/}*.html',
            'fonts/{,*/}*.*',
            'docs/{,*/}*.css', //for the kitchen sink...
            'docs/{,*/}*.js' //for the kitchen sink...
          ]
        }]
      },
      jsonp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/scripts/ucsd',
          dest: '<%= config.dist %>/scripts',
          src: [
            'decorator-jsonp.js'
          ]
        }]
      },
      changelog: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/..',
          dest: '<%= config.dist %>',
          src: [
            'CHANGELOG.txt'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      deploy: {
        cwd: 'dist', // set working folder / root to copy
        src: '**/*', // copy all files and subfolders
        dest: '/Users/a6wu/Site', // destination folder
        expand: true // required when using cwd
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: '<%= config.app %>/vendor/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },



    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        //'compass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        //'compass',
        'copy:styles',
        'imagemin',
        //'svgmin'
      ]
    },

    compress: {
      main: {
        options: {
          archive: 'ucsd-decorator-<%= config.version %>.zip'
        },
        files: [{
          cwd: 'dist/',
          src: ['**'],
          expand: true,
          dest: '/'
        }]
      }
    },









    replace: {
      decoratorVersion: {
        src: ['dist/**/*.html', 'dist/*.html'],
        overwrite: true, // overwrite matched source files
        replacements: [{
          from: /%param-decorator-version%/g,
          to: '<%= config.version %>'
        }]
      }
    },









  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });



  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('default', [
    'clean:dist',
    'useminPrepare',
    'sass:dist',
    'concurrent:dist',
    'concat',
    //'autoprefixer',
    'cssmin',
    'uglify',
    'copy:dist',
    'copy:jsonp',
    'postcss:dist',
    'copy:changelog',
    'modernizr',
    'usemin',
    'replace',
    'compress'
  ]);

  grunt.loadNpmTasks('grunt-contrib-sass');
  //grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-postcss');

  // grunt.registerTask('default', [
  //   'browserSync',
  //   'watch',
  //   'postcss'
  // ]);


};
