/* eslint-env node */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const rollup = require('gulp-rollup');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('main-files', () => {
  return gulp.src(['./src/*.*'])
    .pipe(gulp.dest('./build'));
});


gulp.task('assets', () => {
  return gulp.src(['./src/assets/**/*.*'])
    .pipe(gulp.dest('./build/assets'));
});


gulp.task('sass', () => {
  return gulp.src(['./src/sass/**/*.scss', '!./src/sass/**/_*.*'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['last 15 versions'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('rollup-module', () => {
  gulp.src([
    './src/js/main.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(rollup({
    banner: '\'use strict\'',
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup'],
        plugins: ['lodash'],
      }),
    ],
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['build']);
  gulp.watch('./src/sass/*.*', ['sass']);
  gulp.watch('./src/assets/*.*', ['assets']);
  gulp.watch('./src/*.*', ['main-files']);
});

gulp.task('webserver', () => {
  gulp.src('./build')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true,
      defaultFile: 'index.html',
    }));
});

gulp.task('demo', ['webserver']);
gulp.task('rollup', ['rollup-module']);
gulp.task('build', ['rollup', 'sass', 'assets', 'main-files']);

gulp.task('dev', ['build', 'watch', 'webserver']);
