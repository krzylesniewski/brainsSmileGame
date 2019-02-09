let gulp = require('gulp');
let sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded',
      sourceComments: 'map',
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('style'));
});

gulp.task('watch', function () {
  gulp.watch('scss/*.scss', gulp.series('sass'));
});