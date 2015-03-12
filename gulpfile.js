var gulp = require('gulp');
var riotTagsCompiler = require('gulp-fight-riot/tags-compiler');

gulp.task('dev', ['riot'], function() { });

// Build Riot Tags
gulp.task('riot', function () {
    gulp.src('./public/app-components/**/*.jade')
        .pipe(riotTagsCompiler({dist: './public/build/tags/',loadCss:true,amd:true,next:'es6,styl'}))
        .on('error', console.log)
});

gulp.task('watch', function() {
    // Watch components
    gulp.watch(['./public/app-components/**/*.{jade,es6,styl}'],[
        'riot'
    ]);
});

gulp.task('default', ['dev','watch']);