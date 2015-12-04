/*jslint node: true */
'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-ruby-sass'),
  //sass = require('gulp-sass'),
  cssmin = require('gulp-minify-css'),
  coffee = require('gulp-coffee'),
  rigger = require('gulp-rigger'),
  slim = require('gulp-slim'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/assets/js/',
    css: 'build/assets/css/',
    img: 'build/assets/img/',
    fonts: 'build/assets/fonts/',
    vendor_js: 'build/assets/js/vendor/',
    vendor_css: 'build/assets/css/vendor/'
  },
  src: {
    html: ['source/*.slim', '!source/partials/_*.slim'],
    js: ['source/assets/javascripts/*.coffee', '!source/assets/javascripts/*/_*.coffee'],
    sass: 'source/assets/stylesheets/',
    img: 'source/assets/images/**/**/*.*',
    fonts: 'source/assets/fonts/**/*.*'
  },
  vendor: {
    js: ['source/assets/javascripts/vendor/*.js', '!source/assets/javascripts/**/_*.coffee'],
    css: 'source/assets/stylesheets/vendor/*.css'
  },
  watch: {
    html: 'source/**/*.slim',
    js: 'source/assets/javascripts/**/*.coffee',
    vendor_js: 'source/assets/javascripts/vendor/*.js',
    css: 'source/assets/stylesheets/*.scss',
    vendor_css: 'source/assets/stylesheets/vendor/*.scss',
    img: 'source/assets/images/**/**/*.*',
    fonts: 'source/assets/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Front Server"
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  return gulp.src(path.src.html)
    .pipe(slim({
      pretty: true //Add pretty-indentation whitespace to output (false by default)
    }))  // Собираем slim только в папке ./assets/ исключая файлы с _*
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest(path.build.html)) // Записываем собранные файлы
    .pipe(reload({stream: true})); // даем команду на перезагрузку страницы
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(coffee({bare: true}).on('error', console.log))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('vendor:js:build', function () {
  return gulp.src(path.vendor.js)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.vendor_js))
    .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
  return sass(path.src.sass, {
    precision: 6,
    style: 'expanded',
    stopOnError: true,
    loadPath: process.cwd() + '/' + path.src.sass
  })
    .on('error', sass.logError)
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('vendor:css:build', function () {
  return gulp.src(path.vendor.css)
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.vendor_css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img)
    .pipe(imagemin({
      //progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest(path.build.img))
    //.pipe(notify({
    //  message: "Image: <%= file.relative %>",
    //  title: "Image optimized and published."
    //}))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'css:build',
  'fonts:build',
  'image:build',
  'vendor:js:build',
  'vendor:css:build'
]);


gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.css], function (event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.vendor_js], function (event, cb) {
    gulp.start('vendor:js:build');
  });
  watch([path.watch.vendor_css], function (event, cb) {
    gulp.start('vendor:css:build');
  });
  watch([path.watch.img], function (event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function (event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);