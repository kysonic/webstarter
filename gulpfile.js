var gulp = require('gulp');
var riotTagsCompiler = require('gulp-fight-riot/tags-compiler');
watch = require('gulp-watch');

gulp.task('dev', ['riot'], function() { });

// Build Riot Tags
gulp.task('riot', function () {
    gulp.src('./public/app-components/**/*.jade')
        .pipe(watch('./public/app-components/**/*.{jade,es6,styl}',{verbose:true}))
        .pipe(riotTagsCompiler({dist: './public/build/tags/',loadCss:true,amd:true,first:'jade',next:'es6,styl'}))
        .on('error', console.log)
});


gulp.task('default', ['dev']);