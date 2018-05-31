'use strict'; 
var gulp = require('gulp'), 
    sass= require('gulp-sass'), 
    stylus= require('gulp-stylus'), 
    browserSync = require('browser-sync'), 
    del = require('del'), 
    imagemin = require('gulp-imagemin'), 
    uglify = require('gulp-uglify'), 
    usemin = require('gulp-usemin'), 
    rev = require('gulp-rev'), 
    cleanCss = require('gulp-clean-css'), 
    flatmap = require('gulp-flatmap'), 
    htmlmin = require('gulp-htmlmin'); 

gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css')); 
});

gulp.task('stylus', function () {
    return gulp.src('./css/*.styl')
        .pipe(sass().on('error', stylus.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('stylus:watch', function () {
    gulp.watch('./css/*.styl', ['stylus']);
});
gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function(){
    var files = [
        './*.html', 
        './css/*.css', 
        './img/*.{png,jpg,gif}', 
        './js/*.js'
    ];
    browserSync.init(files, {
        server:{
            baseDir: "./"
        }
    });
});

//Clean task
gulp.task('clean', function () {
    return del(['dist']);
});
gulp.task('copyfonts', function(){
gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}*')
.pipe(gulp.dest('./dist/fonts'));
});

//the Imagemin task
gulp.task('imagemin', function(){
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, inerlaced:true}
    ))
    .pipe(gulp.dest('dist/img')); 
});

// the distribution folder tasks

gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream 
        .pipe(usemin({
            css: [ rev() ], 
            html: [ function() { return htmlmin({ collapseWhitespace: true})} ]
            ,
            js: [ uglify(), rev()], 
            inlinejs: [ uglify()], 
            inlinecss: [ cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/')); 
}); 
// Gulping the task default 
gulp.task('build', ['clean'], function() {
    gulp.start('copyfonts', 'imagemin', 'usemin'); 
}); 
// THe default tasks
gulp.task('default', ['browser-sync'], function () {
    gulp.start('sass:watch');
    gulp.start('stylus:watch'); 
});