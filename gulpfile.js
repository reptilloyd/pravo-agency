var gulp = require('gulp'),

    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),

    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    copy = require('gulp-copy'),

    changed = require('gulp-changed');
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');


/////////////////////////////////
/////  On ERROR function        /
/////////////////////////////////
function errorLog(err){
  console.log(err.message);
  this.emit('end');
}




gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('sass', function () {
  gulp.src('assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'Firefox 3.5',
        'Opera 9',
        'Safari 3.1',
        'Chrome 5',
        'ie 8'
      ],
      remove: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('minifycss', function () {
  gulp.src('assets/css/style.css')
      .pipe(changed('prod/css'))
    // .pipe(rename({suffix:'.min'}))
    // .pipe(minifycss())
    .pipe(gulp.dest('prod/css/'))
    .pipe(connect.reload());
});

gulp.task('javascript', function() {
    gulp.src([
      'assets/js/**/*.js'
    ])
    .pipe(changed('prod/js/'))
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .on('error', errorLog)
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('prod/js/'))
    .on('error', function (event) {
      gutil.log(event);
    })
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('assets/*.html')
    .pipe(changed('prod/'))
    .pipe(gulp.dest('prod/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch('assets/css/*.css', ['minifycss']);
  gulp.watch('assets/js/**/*.js', ['javascript']);
  gulp.watch('assets/*.html', ['html']);

});


gulp.task('default', ['connect', 'html', 'sass', 'minifycss', 'javascript', 'watch']);
