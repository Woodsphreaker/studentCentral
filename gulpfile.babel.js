import gulp from 'gulp'
import uglify from 'gulp-uglify'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import cleanCSS from 'gulp-clean-css'
import watch from 'gulp-watch'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import babelify from 'babelify'
import buffer from 'vinyl-buffer'

const uglifyOptions = {
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  },
  output: {
    comments: false
  }
}

const STUDENT_CENTRAL = [
  './source/*.js',
  './helpers/*.js'
]

gulp.task('SC', () => {
  browserify({
    entries: ['./StudentCentral/source/main.js'],
    extensions: [ '.js' ],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('studentCentral.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
})

gulp.task('STUDENT_CENTRAL', () => {
  gulp.watch(STUDENT_CENTRAL, ['SC'])
})

// USAGE - gulp [ taskname ]
