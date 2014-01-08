// Generated on 2014-01-04 using generator-mobile 0.0.2
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: 35729});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

/*
@paul_irish hi~ Chrome Remote Debug showed the red box when set portforward 35729 (livereload).
*/

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks

    //https://github.com/darkfe/grunt-packer
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-jspacker');

    grunt.loadNpmTasks('grunt-bower-install');

    grunt.loadNpmTasks('grunt-gh-pages');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };



    grunt.initConfig({

        yeoman: yeomanConfig,

        // TODO: Make this conditional
        watch: {
            // coffee: {
            //     files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
            //     tasks: ['coffee:dist']
            // },
            // coffeeTest: {
            //     files: ['test/spec/{,*/}*.coffee'],
            //     tasks: ['coffee:test']
            // },
            // compass: {
            //     files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            //     tasks: ['compass:server']
            // },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                //    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
        },
        autoshot: {
            default_options: {
                options: {
                    // necessary config
                    path: 'screenshots/',
                    filename: '',
                    type: 'PNG',
                    // optional config, must set either remote or local
                    remote: 'http://localhost:<%= connect.options.port %>',
                    viewport: ['320x480','480x320','384x640','640x384','602x963','963x602','600x960','960x600','800x1280','1280x800','768x1024','1024x768']
                },
            },
        },
        responsive_images: {
            dev: {
                options: {
                    sizes: [
                        {
                            width: 320,
                        },
                        {
                            width: 640
                        },
                        {
                            width: 1024
                        }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://webp.catalok.192.168.0.120.xip.io:<%= connect.options.port %>'
            },
            nexus4:{
                path: 'http://www.browserstack.com/start#os=android&os_version=4.2&device=LG+Nexus+4&speed=1&start=true&url=http://rnikitin.github.io/examples/jumbotron/'
            },
            nexus7:{
                path: 'http://www.browserstack.com/start#os=android&os_version=4.1&device=Google+Nexus+7&speed=1&start=true&url=http://rnikitin.github.io/examples/jumbotron/'
            },
            iphone5:{
                path: 'http://www.browserstack.com/start#os=ios&os_version=6.0&device=iPhone+5&speed=1&start=true&url=http://rnikitin.github.io/examples/jumbotron/'
            }

        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        // compass: {
        //     options: {
        //         sassDir: '<%= yeoman.app %>/styles',
        //         cssDir: '.tmp/styles',
        //         generatedImagesDir: '.tmp/images/generated',
        //         imagesDir: '<%= yeoman.app %>/images',
        //         javascriptsDir: '<%= yeoman.app %>/scripts',
        //         /*fontsDir: '<%= yeoman.app %>/styles/fonts',*/
        //         importPath: '<%= yeoman.app %>/bower_components',
        //         httpImagesPath: '/images',
        //         httpGeneratedImagesPath: '/images/generated',
        //         httpFontsPath: '/styles/fonts',
        //         relativeAssets: false
        //     },
        //     dist: {},
        //     server: {
        //         options: {
        //             debugInfo: true
        //         }
        //     }
        // },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: yeomanConfig.app + '/scripts',
                    optimize: 'none',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },


        modernizr: {

            // Path to the build you're using for development.
            "devFile" : "<%= yeoman.app %>/bower_components/modernizr/modernizr.js",

            // Path to save out the built file.
            "outputFile" : "<%= yeoman.dist %>/scripts/modernizr.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                "mq" : false,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false
            },

            // By default, source is uglified before saving
            "uglify" : true,

            // Define any tests you want to impliticly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            // "files" : [],

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        },

        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            tidy: {
                options: {
                    report: 'gzip',
                    banner:'/* Lok\'s little experiment. \n 3Dmatrix,JS,Touch Animation \n Licensed Under MIT. */'
                },
                files: {
                    '<%= yeoman.dist %>/styles/tidy.css': [
                       '<%= yeoman.dist %>/styles/tidy.css'
                    ]
                }
            }
        },
        uncss: {
            dist: {
                options: {
                    // stylesheets: ['dist/styles/tidy.css']
                },
                files: {
                    'dist/styles/tidy.css': ['app/index.html']
                }

            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                    */
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                //'coffee:dist',
                //'compass:server'
            ],
            test: [
                // 'coffee',
                // 'compass'
            ],
            dist: [
                //'coffee',
                //'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin',
            ]
        },
        // bower: {
        //     options: {
        //         exclude: ['modernizr']
        //     },
        //     all: {
        //         rjsConfig: '<%= yeoman.app %>/scripts/main.js'
        //     }
        // },
        packer: {
            options: {
                separator: '',
                punctuation: '/*MIT License*/',
            },
            dist: {
                files: {
                    'dist/scripts/core.js': ['dist/scripts/core.js'],
                }
            },
        },

        'bower-install': {
            target: {
                // Point to the files that should be updated when
                // you run `grunt bower-install`
                src: ['app/index.html'],

                // Optional:
                // ---------
                cwd: '',
                ignorePath: 'app/',
                exclude: [
                    'modernizr.js',
                ],
                fileTypes: {}
            }
        },
        'gh-pages': {
            dist:{
                options: {
                    user: {
                        name: 'Wong Lok',
                        email: 'wonglok@wonglok.com'
                    },
                    repo: 'git@github.com:wonglok/WebPerformanceExperimentz.git',
                    base: 'dist'
                },
                src: ['**']
            }
        },
        exec: {
            packer: {
                command: function(){
                    return 'packer -i ./dist/scripts/core.js -o ./dist/scripts/core.js -b yes -s yes';
                }
            }
        }
    });



    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        //'requirejs',
        //'cssmin',
        'responsive_images:dev',
        'concat',
        'uglify',
        'exec:packer',
        'copy',
        'uncss',
        'cssmin:tidy',
        'rev',
        'usemin',
    ]);

    grunt.registerTask('de', [
        'bower-install'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('page', function(){

        grunt.task.run([
            // 'forceOn',
            'build',
            'gh-pages'
            // 'forceOff',
        ]);
    });


    grunt.registerTask('screenshots', [
        'clean:server',
        'concurrent:server',
        'connect:livereload',
        'autoshot'
    ]);

};
