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
	return gulp.src(app_dir+'/tinymce/**/*.*')
	.pipe(gulp.dest(dist_dir+'/tinymce'));
});

gulp.task('img', function(){
	return gulp.src(img_dir+'/**/*.*')
	.pipe(gulp.dest(dist_dir+'/img'));
});

gulp.task('less', function(){
	return gulp.src(less_dir+'/styles.less')
	.pipe(less())
	.pipe(gulp.dest(dist_dir+'/css/'));
});

function bundleJs(watch){
	function bundle(b){
		return b.bundle()
			.pipe(source('app.bundle.js'))
			.pipe(buffer())
			.pipe(_if(isProduction, uglify()))
			.on('error', gutil.log)
			.on('end', function(){
				return gutil.log('Finished compiling js');
			}).pipe(gulp.dest(dist_dir+'/js'));
	};
	var b = browserify({
		entries: js_dir+'/app.js',
		transform: [reactify],
		debug: !isProduction,
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	if(watch) {
		var w  = watchify(b);
		w.on('update', function(){
			return bundle(w);
		});
		return bundle(w);
	}
	return bundle(b);
};

gulp.task('js', function(){
	return bundleJs();
});

gulp.task('js:watch', function(){
	return bundleJs(true);
});

gulp.task('server', function () {
	nodemon({
		script: 'server.js',
		watch: ['server.js', 'routes/**', 'models/**'],
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
	gulp.watch([less_dir+'/**/*.less'], ['less']);
	gulp.start(['js:watch','server']);
});

gulp.task('test', ['lint']);

gulp.task('default', ['less', 'js', 'tinymce', 'img']);
