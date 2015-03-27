var projectName = 'Project Name';

var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var sassDir = 'scss';
var targetCSSDir = '../css';

var jsDir = 'js';
var targetJSDir = '../js';

var imgDir = 'img';
var targetImgDir = '../img';

gulp.task('css', function() {
	return gulp.src(sassDir + '/style.scss')
		.pipe(sass({ style: 'compressed' }))
		.pipe(autoprefix('last 10 version'))
		.pipe(gulp.dest(targetCSSDir))
		.pipe(notify(projectName + ' CSS Updated!'))
});

gulp.task('js', function() {
  gulp.src(jsDir + '/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest(targetJSDir))
    .pipe(notify(projectName + ' Javascript Updated!'))
});

gulp.task('watch', function() {
	gulp.watch(sassDir + '/*.scss', ['css']);
	gulp.watch(targetCSSDir + '/*.css').on('change', livereload.changed);
	gulp.watch(jsDir + '/*.js', ['js']);
	gulp.watch(targetJSDir + '/*.js').on('change', livereload.changed);

});

gulp.task('default', ['css', 'js', 'watch']);