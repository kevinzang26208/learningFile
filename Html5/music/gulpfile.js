var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var jsUglify = require('gulp-uglify');
var jsConcat = require('gulp-concat');
// var stripDebug = require('gulp-strip-debug');
var less = require('gulp-less');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');
var babel = require('gulp-babel');



var devMode = process.env.NODE_ENV === 'development';/*判断是否是生产环境*/

var folder = {
	src:'./src/',
	dist:'./dist/'
};

gulp.task('html',function () {
	var oSrc = gulp.src(folder.src + 'html/*')
		.pipe(connect.reload());/*浏览器自动刷新*/
	if(!devMode){
		oSrc.pipe(htmlClean())
	}
	oSrc.pipe(gulp.dest(folder.dist + 'html/'))
});

gulp.task('image',function () {
	gulp.src(folder.src + 'images/*')
		.pipe(imageMin())
		.pipe(gulp.dest(folder.dist + 'images/'))
});

gulp.task('js',function () {
	var oSrc = gulp.src(folder.src + 'js/*')
		.pipe(connect.reload());
	if(!devMode){
		oSrc
			.pipe(babel({
				presets: ['env']
			}))
			.pipe(jsUglify())
			.pipe(jsConcat('main.js'))/*合成后的名字*/
	}
	oSrc.pipe(gulp.dest(folder.dist + 'js/'))
});

gulp.task('css',function () {
	var groupcmd = [autoprefixer(),cssnano()];/*顺序不能反，否则前缀不能添加*/
	var oSrc = gulp.src(folder.src + 'css/*');
	if(!devMode){
		oSrc.pipe(postCss(groupcmd))
	}
		oSrc.pipe(connect.reload())
			.pipe(less())
			.pipe(gulp.dest(folder.dist + 'css/'))
});

gulp.task('watch',function () {
	gulp.watch(folder.src + 'html/*',['html']);
	gulp.watch(folder.src + 'js/*',['js']);
	gulp.watch(folder.src + 'css/*',['css']);

});

gulp.task('server',function () {
	connect.server({
		port:'8088',/*可以改变服务器端口*/
		livereload:true
	})
});

gulp.task('default',['html','js','css','image','watch','server']);

/*$ export NODE_ENV=development*/