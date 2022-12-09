'use strict';

const browserSync   = require('browser-sync').create(),
    gulp            = require('gulp'),
    plugins         = require('gulp-load-plugins')(),
    sass            = require('gulp-sass')(require('sass'));

plugins.fs          = require('fs');
plugins.merge       = require('merge-stream')
plugins.browserify  = require('browserify')
plugins.babelify    = require('babelify')
plugins.buffer      = require('vinyl-buffer')
plugins.source      = require("vinyl-source-stream")

gulp.task('pl', function () {
    console.log(plugins);
});
// https://sass-lang.com/documentation/breaking-changes/slash-div

/* Paths and variables */
let src = {
        main: '../',
        scss: './scss',
        js: './js',
        html: './html',
        njk: './njk',
    },
    dist = {
        main: '../',
        css: '../assets/css',
        js: '../assets/js'
    },
    markupHtml = true
/* End Paths and variables */

/* Service tasks */
gulp.task('clean-css-maps', function () {
    return gulp.src(dist.css + '/maps', {read: false})
        .pipe(plugins.clean({force: true}))
});
/* End Service tasks */


gulp.task('scss', require('./gulpfile_css')(gulp, plugins, false, sass));
gulp.task('scss:release', require('./gulpfile_css')(gulp, plugins, true, sass));
gulp.task('js', require('./gulpfile_js')(gulp, plugins, false));
gulp.task('js:release', require('./gulpfile_js')(gulp, plugins, true));
if (markupHtml) {
    gulp.task('html', require('./gulpfile_html')(gulp, plugins))
} else {
    gulp.task('njk', require('./gulpfile_njk')(gulp, plugins));
}

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: dist.main
        },
        port: 4000
    })

    gulp.watch([
        dist.main + '*.html',
        dist.css + '/**/*.css',
        dist.js + '/**/*.js',
    ], {cwd: './'})
        .on('change', function (path, stats) {
            browserSync.reload();
        });
});

gulp.task('watch', function () {
    gulp.watch(src.scss + '/**/*.scss', {cwd: './'}, gulp.series('scss'));
    gulp.watch(src.js + '/**/*.js', {cwd: './'}, gulp.series('js'));
    if (markupHtml) {
        gulp.watch(src.html + '/**/*.html', {cwd: './'}, gulp.series('html'));
    } else {
        gulp.watch(src.njk + '/**/*.html', {cwd: './'}, gulp.series('njk'));
    }
});

if (markupHtml) {
    gulp.task('default', gulp.series('scss', 'js', 'html', gulp.parallel('browser-sync', 'watch')));
    gulp.task('release', gulp.series('clean-css-maps', 'scss:release', 'js:release', 'html'));
} else {
    gulp.task('default', gulp.series('scss', 'js', 'njk', gulp.parallel('browser-sync', 'watch')));
    gulp.task('release', gulp.series('clean-css-maps', 'scss:release', 'js:release', 'njk'));
}
