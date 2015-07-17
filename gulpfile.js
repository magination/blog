var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var notify = require('gulp-notify');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var nodemon = require('nodemon');


var dist_dir = './static',
	app_dir = './frontend',
	img_dir = app_dir+'/images',
	less_dir = app_dir+'/styles',
	js_dir =  app_dir+'/app';

gulp.task('tinymce', function(){
	gulp.src(app_dir+'/tinymce/**/*.*')
	.pipe(gulp.dest(dist_dir+'/tinymce'));
});

gulp.task('img', function(){
	gulp.src(img_dir+'/**/*.*')
	.pipe(gulp.dest(dist_dir+'/img'));
});

gulp.task('less', function(){
	gulp.src(less_dir+'/styles.less')
	.pipe(less())
	.pipe(gulp.dest(dist_dir+'/css/'));
});

function bundleJs(watch){
	var b = browserify({
		entries: js_dir+'/app.js',
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {}
	})
	if (watch)
		watchify(b).on('time', function(time){
		gutil.log('Finished compiling js: ' + time + ' ms');
	});
	return b.bundle()
		.pipe(source('app.bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.on('error', gutil.log)
		.pipe(gulp.dest(dist_dir+'/js'));
};

gulp.task('js', function () {
		bundleJs();
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
		ingore: [dist_dir, app_dir],
		ext: 'js html',
		env: { 'NODE_ENV': 'development' }
  })
});


gulp.task('watch', function () {
	gulp.watch([less_dir+'/**/*.less'], ['less']);
	bundleJs(true);
	gulp.start('server');
});


gulp.task('default', ['less', 'js', 'tinymce', 'img']);
