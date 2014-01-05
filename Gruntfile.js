module.exports = function(grunt) {
    'use strict';

    var file_list =  [
        '**/*.js'
        ,'bin/*'
        ,'!node_modules/**/*.js'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                // Enforcing options
                curly: true
                ,eqeqeq: true
                ,immed: true
                ,latedef: 'nofunc'
                ,newcap: true
                ,noarg: true
                ,noempty: true
                ,quotmark: 'single'
                ,unused: true
                ,strict: true
                ,trailing: true
                ,browser: true
                ,node: true

                // Relaxing options
                ,boss: true
                ,laxcomma: true
                ,globalstrict: true
            },
            uses_defaults: file_list.concat(['Gruntfile.js'])
        }

        ,vows: {
          all: {
            options: {
              reporter: 'spec'
            },
            src: ['test/*-test.js']
          }
        }

        ,watch: {
            scripts: {
                files: file_list,
                tasks: ['jshint', 'vows'],
                options: {
                    spawn: false
                    ,interrupt: true
                },
            },
        },
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-vows');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'vows']);

    // On file change only run jshint on the changed file not the whole thing
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.uses_defaults', filepath);
    });
};