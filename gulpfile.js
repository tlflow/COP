// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint         = require('gulp-jshint');
var marked         = require('marked');
var sass           = require('gulp-sass');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var rename         = require('gulp-rename');
var data           = require('gulp-data');
var frontMatter    = require('gulp-front-matter');
var wrap           = require('gulp-wrap');
var markdown       = require('nunjucks-markdown');
var nunjucksRender = require('gulp-nunjucks-render');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Render nunjucks templates
gulp.task('nunjucks', function() {
  var env = nunjucksRender.nunjucks.configure(['templates/']);

  // marked.setOptions({
  //   renderer: new marked.Renderer(),
  //   gfm: true,
  //   tables: true,
  //   breaks: false,
  //   pendantic: false,
  //   sanitize: true,
  //   smartLists: true,
  //   smartypants: false
  // });

  markdown.register(env, marked);

  // Gets .html and .nunjucks files in pages
  return gulp.src('pages/**/*.+(md|html|nunjucks)')

  // Adding data to Nunjucks
  .pipe(data(function() {
    return require('./page-data.json')
  }))

  // Renders template with nunjucks
  .pipe(nunjucksRender())

  // output files in app folder
  .pipe(gulp.dest('dist'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
