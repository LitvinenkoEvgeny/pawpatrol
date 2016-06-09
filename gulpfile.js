var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  path = require('path'),
  browserSync = require('browser-sync'),
  through2 = require('through2'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  del = require('del'),
  argv = require('yargs').argv,
  gutil = require("gulp-util"),
  webpack = require('webpack');


  gulp.task('browser-sync', function () {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', function () {
  return gulp.src('./src/stylesheets/**/*.{scss,sass}')
    .pipe($.plumber())
    .pipe($.compass({
      css: 'dist/stylesheets',
      sass: 'src/stylesheets'
    }))
    .pipe(gulp.dest('dist/stylesheets'));
});


gulp.task('js', function (callback) {
  // run webpack
  webpack({
    // configuration
    entry: './src/scripts/main.js',

    output: {
      path: './dist/scripts/',
      filename: 'app.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel' // 'babel-loader' is also a legal name to reference
        }
      ]
    },
  }, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('clean', function (cb) {
  del('./dist', cb);
});

gulp.task('images', function () {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('templates', function () {
  return gulp.src('src/**/*.html')
    .pipe($.plumber())
    .pipe(gulp.dest('dist/'))
});


gulp.task('build', ['compass', 'js', 'templates', 'images']);

gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/stylesheets/**/*.{scss,sass}', ['compass', reload]);
  gulp.watch('src/scripts/**/*.js', ['js', reload]);
  gulp.watch('src/images/**/*', ['images', reload]);
  gulp.watch('src/*.html', ['templates', reload]);
});

gulp.task('default', ['serve']);
