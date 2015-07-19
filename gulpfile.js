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
var _if = require('gulp-if');
var args = require('yargs').argv;
var isProduction = !!args.production;
var eslint = require('gulp-eslint');


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
		packageCache: {},
		fullPaths: true
	})
	if(watch){
		watchify(b).on('time', function(time){
			gutil.log('Finished compiling js: ' + time + ' ms');
		});
	}
	return b.bundle()
		.pipe(source('app.bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true, debug: true}))
		.pipe(uglify())
		.pipe(_if(!isProduction, sourcemaps.write('./')))
		.on('error', gutil.log)
		.pipe(gulp.dest(dist_dir+'/js'));

};

gulp.task('js', function () {
		return bundleJs();
});

gulp.task('js:watch', function () {
		return bundleJs(true);
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
		ingore: [dist_dir, app_dir],
		ext: 'js html',
		env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('lint', function () {
    return gulp.src([js_dir +'/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});


gulp.task('watch', function () {
	gulp.watch([less_dir+'/**/*.less', js_dir+'/**/*.js'], ['less', 'js:watch']);
	gulp.start('server');
});

gulp.task('test', ['lint']);

gulp.task('default', ['less', 'js', 'tinymce', 'img']);
