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

var env = process.env.NODE_ENV;

var getBasename = (file) => path.basename(file.relative, path.extname(file.relative));

let articles = [];

gulp.task('articles-registry', () => {
  articles = [];
  return gulp.src(env === 'dev' ? ['2015-*.md'] : [ '2015-*.md', '!*draft*.md' ])
    .pipe(replace('https://iamstarkov.com/', '/'))
    .pipe((() => through.obj((file, enc, cb) => {
      const article = file.contents.toString();
      articles.push(assign({}, {
        site: site,
        filename: file.relative,
        url: getBasename(file).substr('8') + '/',
      }, extract(article)));
      articles.sort((a, b) => b.sortableDate - a.sortableDate );
      cb(null, file);
    }))());
});

gulp.task('index-page', () =>
  gulp.src('layouts/index.jade')
    .pipe(data(() => {
      return { site: site, list: articles };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'))
);

gulp.task('articles-pages', (done) => {
  each(articles, function(article) {
    return gulp.src('layouts/article.jade')
      .pipe(data(() => article))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: article.url }))
      .pipe(rename({ basename: 'index' }))
      .pipe(gulp.dest('dist'));
  }, done);
});

gulp.task('rss', (done) => {
  var feed = new rss(site);
  articles.forEach((article) => {
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

gulp.task('watch', ['express', 'build'], () => {
  watch(['**/*{jade,md,json,js}', '*.css'], () => { gulp.start('build'); });
});

gulp.task('clean', (done) => { del('dist', done); });

gulp.task('build', (done) => {
  sequence('articles-registry', ['index-page', 'articles-pages', 'rss'], 'css', 'cname', done);
});

gulp.task('css', () => {
  return gulp.src('styles.css').pipe(gulp.dest('dist'));
});

gulp.task('cname', () => {
  return gulp.src('CNAME').pipe(gulp.dest('dist'));
});

gulp.task('gh', ['build'], (done) => {
  buildbranch({ branch: 'master', folder: 'dist' }, done);
});

gulp.task('express', () => {
  express().use(express.static('dist')).listen(4000);
  log('Server is running on http://localhost:4000');
});
