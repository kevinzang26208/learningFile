var gulp = require('gulp');

var htmlClean = require('gulp-htmlclean');

var less = require('gulp-less');
var postCss = require('gulp-postcss');
var cssNano = require('cssnano');
var autoPrefixer = require('autoprefixer');

var imageMin = require('gulp-imagemin');
var newer = require('gulp-newer');
var connect = require('gulp-connect');

var devMode = process.env.NODE_ECV === 'development';

var folder = {
	src:'./src/',
	dist:'./dist/'
};

gulp.task('html',function () {
	var oSrc = gulp.src(folder.src + 'html/*')
		.pipe(connect.reload());
		// .pipe(newer(folder.src + 'html/'));
	if (!devMode){
		oSrc.pipe(htmlClean());
	}
	oSrc.pipe(gulp.dest(folder.dist + 'html/'));
});
gulp.task('css',function () {
	var groupCMD = [autoPrefixer(),cssNano()];
	var oSrc = gulp.src(folder.src + 'css/*')
		.pipe(connect.reload());
		/*.pipe(newer(folder.src + 'css/'));*//*会导致当dist目录没有css文件夹时，并不会自动生成*/
	if(!devMode){
		oSrc.pipe(postCss(groupCMD));
	}
	oSrc.pipe(less())
		.pipe(gulp.dest(folder.dist + 'css/'));
});
gulp.task('image',function () {
	gulp.src(folder.src + 'images/*')
		.pipe(newer(folder.src + 'images/'))
		.pipe(imageMin())
		.pipe(gulp.dest(folder.dist + 'images/'));
});
gulp.task('watch',function () {
	gulp.watch(folder.src + 'html/*',['html']);
	gulp.watch(folder.src + 'css/*',['css']);
	// gulp.watch(folder.src + 'js/*',['js']);
	gulp.watch(folder.src + 'images/*',['image'])
});
gulp.task('server',function () {
	connect.server({
		port:'8089',
		livereload:true
	})
});
gulp.task('default',['html','css','image','watch'/*,'server'*/]);

/* $ exprot NODE_ENV=development*/