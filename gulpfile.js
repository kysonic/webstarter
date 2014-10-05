var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    plex = require('gulp-plex-bem'),
    csso = require('gulp-csso');

var path  = require('path');


gulp.task('dev', ['browserify','less'], function() { });
/**
 *  Broserify task
 * */
gulp.task('browserify', function() {
    gulp.src(['public/javascripts/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }).on('prebundle', function(bundler) {
                bundler.require('./app.js', { expose: 'app' });
            })
        )
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/javascripts/'));
});
/**
 *  Less task
 * */
gulp.task('less', function () {
    gulp.src('./public/stylesheets/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname,'public','stylesheets') ]
        }))
        .on('error', console.log)
        .pipe(concat("style.css"))
        .pipe(csso())
        .pipe(gulp.dest('./public/stylesheets/'));
});
/**
 * Plex bem task
 */

gulp.task('plex',function(){
    gulp.src('./app/views/**/*.jade')
        .pipe(plex({}))
        .on('error', console.log);
});

/**
 *  Watcher
 * */
gulp.task('watch', function() {
    // Watch js
    gulp.watch(['public/javascripts/*.js', 'public/javascripts/**/*.js'],[
        'browserify'
    ]);
    // Watch less files
    gulp.watch(['./public/stylesheets/**/*.less'],[
        'less'
    ]);
});

gulp.task('default', ['dev','watch']);