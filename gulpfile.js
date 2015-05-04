'use strict';

var through = require('through2');
var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var data = require('gulp-data');
var jade = require('gulp-jade');
var debug = require('gulp-debug');
var log = require('gulp-util').log;
var buildbranch = require('buildbranch');
var rss = require('rss');
var del = require('del');
var output = require('fs-extra').outputFile;
var express = require('express');
var assign = require('object-assign');
var sequence = require('run-sequence');
var each = require('each-done');

var moment = require('moment');
var unix = function(text) { return moment(new Date(text)).unix(); }

var basename = require('./basename');
var md = require('./md');
var site = require('./package.json').site;

var articles = [];
var articleHarvesting = through.obj(function(file, enc, cb) {
  var content = file.contents.toString();
  articles.push({
    site: site,
    url: basename(file),
    title: md.getTitle(content),
    desc: md.getDescText(content),
    date: md.getDate(content),
    content: md.html(content),
    rss: { description: md.getDesc(content) }
  });
  articles.sort(function(a, b) { return unix(a.date) < unix(b.date); });
  cb(null, file);
});

gulp.task('gather-articles-index', function() {
  articles = [];
  return gulp.src(['*.md'])
    .pipe(rename(function(path) { path.basename = path.basename.substr('8'); }))
    .pipe(articleHarvesting);
});

gulp.task('prod-gather-articles-index', function() {
  articles = [];
  return gulp.src(['*.md', '!*draft*.md'])
    .pipe(rename(function(path) { path.basename = path.basename.substr('8'); }))
    .pipe(articleHarvesting);
});

gulp.task('build-articles-list', function() {
  return gulp.src('layouts/index.jade')
    .pipe(data(function() {
      return {
        site: site,
        list: articles
      };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-articles', function(done) {
  each(articles, function(article) {
    return gulp.src('layouts/article.jade')
      .pipe(data(function() { return article; }))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: article.url }))
      .pipe(rename({ basename: 'index' }))
      .pipe(gulp.dest('dist'));
  }, done);
});

gulp.task('build-rss', function(done) {
  var feed = new rss(site);
  articles.forEach(function(article) {
    feed.item(assign(article, article.rss));
  });
  output('dist/rss.xml', feed.xml({ indent: true }), done);
});

gulp.task('default', ['watch']);

gulp.task('watch', ['express', 'build'], function() {
  watch('**/*{jade,md,json,js}', function() { gulp.start('build'); });
});

gulp.task('clean', function(done) { del('dist', done); });

gulp.task('build', function(done) {
  sequence('gather-articles-index',
          ['build-articles-list', 'build-articles', 'build-rss'],
          'cname',
          done);
});

gulp.task('build-prod', function(done) {
  sequence('clean',
          'prod-gather-articles-index',
          ['build-articles-list', 'build-articles', 'build-rss'],
          'cname',
          done);
});

gulp.task('cname', function() {
  return gulp.src('CNAME').pipe(gulp.dest('dist'));
});

gulp.task('gh', ['build-prod'], function(done) {
  buildbranch({ branch: 'master', folder: 'dist' }, done);
});

gulp.task('express', function() {
  var app = express();
  app.use(express.static('dist'));
  app.listen(4000);

  log('Server is running on http://localhost:4000');
});
