var gulp = require('gulp');
var riotTagsCompiler = require('gulp-fight-riot/tags-compiler');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('dev', ['riot'], function() { });

// Build Riot Tags
gulp.task('riot', function () {
    gulp.src('./public/app-components/**/*.html')
        .pipe(watch('./public/app-components/**/*.{jade,es6,styl}',{verbose:true}))
        .pipe(riotTagsCompiler({dist: './public/build/tags/',loadCss:true,amd:true,first:'jade',next:'es6,styl',uglify:true}))
        .on('error', console.log)
});

gulp.task('stylus', function () {
    gulp.src('./public/stylesheets/**/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(concat('styles.css'))
        .on('error', console.log)
        .pipe(gulp.dest('./public/stylesheets/'))
});

gulp.task('watch', function() {
    // Watch less files
    gulp.watch(['./public/stylesheets/**/*.styl'],[
        'stylus'
    ]);
});

gulp.task('styl',['stylus','watch']);

gulp.task('default', ['dev']);