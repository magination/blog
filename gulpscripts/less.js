var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var _if = require('gulp-if');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var _ = require('./utils');
var notify = require('gulp-notify');

var args = require('yargs').argv;
var isProduction = !!args.production;

gulp.task('less', function () {
    gulp.src(_.path.less)
        .pipe(_if(!isProduction, sourcemaps.init()))
        .pipe(plumber(_.plumb))
        .pipe(less())
        .pipe(prefix())
        .pipe(_if(isProduction, csso()))
        .pipe(rename({
            suffix: ".bundle",
        }))
        .pipe(_if(!isProduction, sourcemaps.write(".")))

        .pipe(gulp.dest(_.join(_.output, 'css/')))
        .pipe(notify('Compiled less'));
});

gulp.task('watch-less', ['less'], function () {
    gulp.watch(_.path.lessWatch, ['less']);
});