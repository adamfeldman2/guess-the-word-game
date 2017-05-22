var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

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

gulp.task('scripts', function() {
  gulp.src("js/*.es6")
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest("js"));
});

gulp.task('watch', ['browserSync', 'sass', 'scripts'], function (){
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/*.js', browserSync.reload);
  gulp.watch('./js/*.es6', ['scripts']);
})
