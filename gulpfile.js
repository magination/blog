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
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
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
	return gulp.src(less_dir+'/*.less')
	.pipe(_if(!isProduction, sourcemaps.init({loadMaps: true})))
	.pipe(less())
	.pipe(prefix())
	.pipe(csso())
	.pipe(_if(!isProduction, sourcemaps.write('.')))
	.pipe(gulp.dest(dist_dir+'/css'));
});

function bundleJs(options){
	options = options ? options:{};
	if(!options.bundle){
		options.bundle = browserify({
			entries: js_dir+'/app.js',
			transform: [reactify],
			debug: true,
			cache: {},
			packageCache: {},
			fullPaths: true
		})
	};

	if(options.watch){
		watchify(options.bundle)
		.on('time', function(time){
			gutil.log('Finished compiling js: ' + time + ' ms');
		}).on('update', function(){
			bundleJs({bundle:options.bundle});
		});
	}

	return options.bundle.bundle()
		.pipe(source('app.bundle.js'))
		.pipe(buffer())
		.pipe(_if(!isProduction, sourcemaps.init({loadMaps: true, debug: true})))
		.pipe(uglify())
		.pipe(_if(!isProduction, sourcemaps.write('./')))
		.on('error', gutil.log)
		.pipe(gulp.dest(dist_dir+'/js'));

};

gulp.task('js', function () {
	return bundleJs();
});

gulp.task('js:watch', function(){
	return bundleJs({watch:true});
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
	gulp.watch([less_dir+'/**/*.less'], ['less']);
	gulp.start(['js:watch','server']);
});

gulp.task('test', ['lint']);

gulp.task('default', ['less', 'js', 'tinymce', 'img']);
