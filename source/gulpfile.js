var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var browserSync = require('browser-sync');
gulp.task('browser-sync', ['cp', 'sass'], function() {
    browserSync({
             server: {
               baseDir: '..'
           }
     });
  });


gulp.task('sass', function(){
  gulp.src('styles/*.scss')
      .pipe(sass()).on('error', handleError)
      .pipe(prefix())
      .pipe(gulp.dest('../styles/'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('rebuild', ['cp'], function () {
      browserSync.reload();
});

gulp.task('cp', function(){
  gulp.src('index.html')
      .pipe(gulp.dest('..'));
  gulp.src('images/**')
      .pipe(gulp.dest('../images/'));
  gulp.src('scripts/*')
      .pipe(gulp.dest('../scripts/'));
});



gulp.task('watch', function(){
  gulp.watch(['index.html','images/*'], ['rebuild']);
  gulp.watch(['styles/*.scss'], ['sass']);
})

gulp.task('default', ['browser-sync', 'watch']);
