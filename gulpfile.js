var gulp = require('gulp');
var riotTagsCompiler = require('gulp-fight-riot/tags-compiler');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('dev', ['riot','styl'], function() { });

// Build Riot Tags on change
gulp.task('riot', function () {
    gulp.src('./public/app-components/**/*.html')
        .pipe(watch('./public/app-components/**/*.{jade,es6,styl}',{verbose:true}))
        .pipe(riotTagsCompiler({dist: './public/build/tags/',systemjs:'./build/tags',amd:false,first:'jade',next:'es6,styl'}))
        .on('error', console.log)
});
// Build all of tags in app-component folder
gulp.task('compile', function () {
    gulp.src('./public/app-components/**/*.jade')
        .pipe(riotTagsCompiler({dist: './public/build/tags/',systemjs:'./build/tags',amd:false,first:'jade',next:'es6,styl'}))
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