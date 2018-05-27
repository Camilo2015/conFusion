'use strict';
module.exports = function(grunt){
    //Time stats to optimises task
    require('time-grunt')(grunt); 
    //Automatically load required Grunt task 
    require('jit-grunt')(grunt); 

    //To define all taks with grunt
       grunt.initConfig({
        sass: {
            dist:{
                files:{
                    'css/styles.css': 'css/styles.scss'
                }
            }
        }, 
        watch:{
            files:'css/*.scss', 
            tasks:['sass']
        },
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css', 
                        '*.html', 
                        'js/*.js'
                    ]
                }, 
                options: {
                    watchTask:true, 
                    server:{
                        baseDir:"./"
                    }
                }
            }
        }
    });
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};