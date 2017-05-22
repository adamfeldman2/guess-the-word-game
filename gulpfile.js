var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
});

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
  })
})

gulp.task('babel', function() {
	return gulp.src('js/scripts.es6')
		.pipe(babel({
		   presets: ['es2015']
		}))
		.pipe(gulp.dest('js'));
});

gulp.task('watch', ['browserSync', 'sass', 'babel'], function (){
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('scss/**/*.scss', ['sass']); 
  gulp.watch('js/**/*.js', browserSync.reload);
})