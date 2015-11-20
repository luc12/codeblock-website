'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var babel = require('gulp-babel');

gulp.task('images', function() {
  return gulp.src('./resources/img/**')
    .pipe(copy('./static/img', {
      prefix: 2
    }));
});

gulp.task('scripts', function() {
  return gulp.src('./resources/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'));
});

gulp.task('styles', function() {
  gulp.src('./resources/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('styles:watch', function () {
  gulp.watch('./resources/styles/**/*.scss', ['styles']);
});

gulp.task('scripts:watch', function () {
  gulp.watch('./resources/js/**/*.js', ['scripts']);
});

gulp.task('images:watch', function() {
  gulp.watch('./resources/img/**', ['images']);
});

gulp.task('watch', ['styles:watch', 'scripts:watch', 'images:watch']);

gulp.task('build', ['styles', 'scripts', 'images']);
