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
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer-core';
import cssvariables from 'postcss-css-variables';
import mdast from 'mdast';
import mdastTextr from 'mdast-textr';
import base from 'typographic-base';

import moment from 'moment';
import { site } from './package.json';

const env = process.env.NODE_ENV || 'dev';
const getBasename = (file) => path.basename(file.relative, path.extname(file.relative));
const typograhic = input => mdast
  .use(mdastTextr, { plugins: [ base ], options: { locale: 'en-us' } })
  .process(input);

let articlesList = [];

const addToList = (file, article) => {
  articlesList.push(assign({}, {
    site: site,
    filename: file.relative,
    url: getBasename(file).substr('8') + '/',
  }, extract(article, 'MMMM D, YYYY', 'en')));
};

const buildArticle = (article) =>
  gulp.src('layouts/article.jade')
    .pipe(data(() => article))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ dirname: article.url }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'));

const getRSS = (site, list) => {
  var feed = new rss(site);
  list
    .filter(i => !!i.date)
    .sort((a, b) => b.date.unix - a.date.unix )
    .forEach((article) => { feed.item({
      url: site.site_url + article.url,
      title: article.title.text,
      description: article.desc.html,
      date: article.date.text
    })});
  return feed.xml({ indent: true });
}

gulp.task('articles-registry', () => {
  articlesList = [];
  return gulp.src(env === 'dev' ? ['201*-*.md'] : [ '201*-*.md', '!*draft*.md' ])
    .pipe(replace('https://iamstarkov.com/', '/'))
    .pipe(replace('https://iamstarkov.com', '/'))
    .pipe((() => through.obj((file, enc, cb) => {
      const contents = file.contents.toString();
      addToList(file, typograhic(contents));
      cb(null, file);
    }))());
});

gulp.task('index-page', () =>
  gulp.src('layouts/index.jade')
    .pipe(data(() => ({
      site,
      list: articlesList
              .filter(i => !!i.date)
              .sort((a, b) => b.date.unix - a.date.unix )
    })))
    .pipe(jade({ pretty: env === 'dev' }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'))
);

gulp.task('each-article', (done) => { each(articlesList, buildArticle, done); });
gulp.task('rss', (done) => { output('dist/rss.xml', getRSS(site, articlesList), done); });

gulp.task('watch', ['express', 'build'], () => {
  watch(['**/*{jade,md,json}', '*.css'], () => { gulp.start('build'); });
});

gulp.task('build', (done) => {
  sequence('articles-registry', ['index-page', 'each-article', 'rss'], 'css', 'cname', done);
});

gulp.task('css', () =>
  gulp.src('styles.css')
    .pipe(postcss([
      autoprefixer(),
      cssvariables()
    ]))
    .pipe(gulp.dest('dist'))
);

gulp.task('clean', (done) => { del('dist', done); });
gulp.task('cname', () => gulp.src('CNAME').pipe(gulp.dest('dist')) );
gulp.task('gh', ['build'], (done) => { buildbranch({ branch: 'master', folder: 'dist' }, done); });

gulp.task('express', () => {
  express().use(express.static('dist')).listen(4000);
  log('Server is running on http://localhost:4000');
});

gulp.task('default', ['watch']);
