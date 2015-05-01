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

var basename = require('./basename');
var md = require('./md');

var articles = [];

gulp.task('gather-articles-index', function() {
  articles = [];
  return gulp.src('*.md')
    .pipe(rename(function(path) { path.basename = path.basename.substr('8'); }))
    .pipe(through.obj(function(file, enc, cb) {
      var content = file.contents.toString();
      articles.push({
        url: basename(file),
        title: md.getTitle(content),
        publishedAt: md.getPublishedAt(content),
        publishedAtInUnix: md.getPublishedAtInUnix(content),
        content: md.markdown(content),

        // rss
        date: md.getPublishedAt(content),
        description: md.markdown(content),
      });
      articles.sort(function(a, b) { return a.publishedAtInUnix < b.publishedAtInUnix; });
      cb(null, file);
    }));
});

gulp.task('build-articles-list', ['gather-articles-index'], function() {
  return gulp.src('layouts/list.jade')
    .pipe(data(function() { return { list: articles }; }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-articles', ['gather-articles-index'], function() {
  return articles.forEach(function(article) {
    gulp.src('layouts/article.jade')
      .pipe(data(function() { return article; }))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: article.url }))
      .pipe(rename({ basename: 'index' }))
      .pipe(gulp.dest('dist'));
  });
})

gulp.task('build-atom-list', ['gather-articles-index'], function(done) {
  var output = require('fs-extra').outputFile;

  var feed = new rss({
    title: 'Vladimir Starkov',
    description: 'Technical blog about frontend from Vladimir Starkov',
    feed_url: 'http://iamstarkov/rss.xml',
    site_url: 'http://iamstarkov/',
    managingEditor: 'iamstarkov@gmail.com (Vladimir Starkov)',
    webMaster: 'iamstarkov@gmail.com (Vladimir Starkov)',
    copyright: 'MIT',
    language: 'en-us',
    categories: ['frontend', 'css', 'typography']
  });

  articles.forEach(feed.item.bind(feed));

  output('dist/rss.xml', feed.xml({ indent: true }), done);
});

gulp.task('default', ['watch']);

gulp.task('watch', ['express', 'build'], function() {
  watch('**/*{jade,md,json,js}', function() { gulp.start('build'); });
})

gulp.task('build', ['build-articles-list', 'build-articles', 'build-atom-list', 'cname']);

gulp.task('cname', function () {
    return gulp.src('CNAME').pipe(gulp.dest('dist'));
});

gulp.task('gh', ['build'], function(done) {
    buildbranch({ branch: 'master', folder: 'dist' }, done);
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static('dist'));
  app.listen(4000);

  log('Server is running on http://localhost:4000');
});
