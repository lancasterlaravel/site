const gulp = require('gulp')

gulp.task('html', () => {
  return gulp.src('src/*.html').pipe(gulp.dest('dist/'))
})

gulp.task('redirects', () => {
  return gulp.src('src/_redirects').pipe(gulp.dest('dist/'))
})

gulp.task('css', () => {
  const postcss = require('gulp-postcss')

  return gulp.src('src/*.css')
      .pipe(postcss())
      .pipe(gulp.dest('./dist'));
})

gulp.task('build', gulp.series('html', 'redirects', 'css'))
