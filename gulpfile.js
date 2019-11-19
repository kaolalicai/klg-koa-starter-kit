var gulp = require('gulp'),
  clean = require('gulp-clean')

gulp.task('clean', function () {
  return gulp.src(['boilerplate/boilerplate/*'], {read: false})
    .pipe(clean())
})

gulp.task('copy', function (done) {
  gulp.src(['./**/*', '!./gulpfile.js', '!./node_modules/**', '!./boilerplate/**', '!./.nyc_output/**'])
    .pipe(gulp.dest('boilerplate/boilerplate/'))
  done()
})

gulp.task('dist', gulp.series("clean", "copy"))
