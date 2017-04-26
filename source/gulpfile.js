const gulp = require('gulp');

const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');

var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');

const watch = require('gulp-watch');

gulp.task('html', function() {
  return gulp.src('html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../app'));
});

gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('../app'))
});

gulp.task('js.dev', () => {
    return gulp.src(['js/**/*.js'])
        .pipe(webpackStream({
            entry: {
                localScript: './js/local-script.js',
                pageScript: './js/page-script'
            },
            output: {
                filename: '[name].js',
            }
        }, webpack2))
        .pipe(gulp.dest('../app'));
});

gulp.task('js.dist', () => {
    return gulp.src(['js/**/*.js'])
        .pipe(webpackStream({
            entry: {
                localScript: './js/local-script.js',
                pageScript: './js/page-script'
            },
            output: {
                filename: '[name].js',
            }
        }, webpack2))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('../app'));
});

gulp.task('watch', function() {
    gulp.watch('html/**/*.html', ['html']);
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['js.dev']);
});

gulp.task('default', ['html', 'sass', 'js.dev', 'watch']);
gulp.task('dist', ['html', 'sass', 'js.dist', 'watch']);