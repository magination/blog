var gulp = require('gulp');
var _ = require('./utils');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var _if = require('gulp-if');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require("reactify");
var args = require('yargs').argv;
var isProduction = !!args.production;
var assign = require('lodash').assign;

gulp.task('js', buildOnce());
gulp.task('watch-js', watch());

var customOpts = {
    debug: !isProduction
};

function buildOnce() {
    var b = browserify(_.path.scripts, customOpts);
    b.transform("reactify");
    b.on('log', notify);
    return bootstrapBundle(b);
}

function watch() {
    var opts = assign({}, watchify.args, customOpts);
    var w = watchify(browserify(_.path.scripts, opts));
    w.transform("reactify");
    w.on('log', notify);
    var bundle = bootstrapBundle(w);
    w.on('update', bundle);
    return bundle;
}

function bootstrapBundle(ifyer) {
    return function () {
        ifyer.bundle()
            .on('error', _.plumb.errorHandler)
            .pipe(source('app.bundle.js'))
            .pipe(_if(isProduction, buffer()))
            .pipe(_if(isProduction, uglify()))
            .pipe(gulp.dest(_.join(_.output, 'js/')))
            .pipe(notify('Compiled javascript'));
    }
}
