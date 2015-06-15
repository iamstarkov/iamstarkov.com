import through from 'through2';
import gulp from 'gulp';
import watch from 'gulp-watch';
import rename from 'gulp-rename';
import data from 'gulp-data';
import jade from 'gulp-jade';
import debug from 'gulp-debug';
import replace from 'gulp-replace';
import { log } from 'gulp-util';
import buildbranch from 'buildbranch';
import rss from 'rss';
import del from 'del';
import { outputFile as output } from 'fs-extra';
import express from 'express';
import assign from 'object-assign';
import sequence from 'run-sequence';
import each from 'each-done';
import path from 'path';
import extract from 'article-data';

import moment from 'moment';
import { site } from './package.json';

var getBasename = function(file) {
  return path.basename(file.relative, path.extname(file.relative));
};

var articles = [];
var articleHarvesting = function() {
  return through.obj(function(file, enc, cb) {
    const article = file.contents.toString();
    articles.push(assign({}, {
      site: site,
      filename: file.relative,
      url: getBasename(file).substr('8') + '/',
    }, extract(article)));
    articles.sort((a, b) => b.sortableDate - a.sortableDate );
    cb(null, file);
  });
};

gulp.task('articles-registry', function() {
  articles = [];
  return gulp.src('2015-*.md')
    .pipe(replace('https://iamstarkov.com', 'http://localhost:4000'))
    .pipe(articleHarvesting());
});

gulp.task('articles-registry-prod', function() {
  articles = [];
  return gulp.src(['*.md', '!*draft*.md'])
    .pipe(articleHarvesting());
});

gulp.task('index-page', function() {
  return gulp.src('layouts/index.jade')
    .pipe(data(function() {
      return { site: site, list: articles };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('articles-pages', function(done) {
  each(articles, function(article) {
    return gulp.src('layouts/article.jade')
      .pipe(data(() => article))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: article.url }))
      .pipe(rename({ basename: 'index' }))
      .pipe(gulp.dest('dist'));
  }, done);
});

gulp.task('rss', function(done) {
  var feed = new rss(site);
  articles.forEach(function(article) {
    console.log(article.titleText);
    feed.item({
      url: site.site_url + article.url,
      title: article.titleText,
      description: article.descHtml,
      date: article.date
    });
  });
  output('dist/rss.xml', feed.xml({ indent: true }), done);
});

gulp.task('default', ['watch']);

gulp.task('watch', ['express', 'build'], function() {
  watch(['**/*{jade,md,json,js}', '*.css'], function() { gulp.start('build'); });
});

gulp.task('clean', function(done) { del('dist', done); });


gulp.task('build-common', function(done) {
  sequence(['index-page', 'articles-pages', 'rss'], 'css', 'cname', done);
});

gulp.task('build', function(done) {
  sequence('articles-registry', 'build-common', done);
});

gulp.task('build-prod', function(done) {
  sequence('clean', 'articles-registry-prod', 'build-common', done);
});

gulp.task('css', function() {
  return gulp.src('styles.css').pipe(gulp.dest('dist'));
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
