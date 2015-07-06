'use strict';
var marked = require('marked');
var removeMd = require('remove-markdown');
var rssPlugin = require('antwar-rss-plugin');
var prevnextPlugin = require('antwar-prevnext-plugin');
var highlightPlugin = require('antwar-highlight-plugin');

module.exports = {
  output: 'build',
  name: 'Vladimir Starkov',
  author: 'Vladimir Starkov',
  deploy: {
    branch: 'master',
  },
  plugins: [
    rssPlugin(),
    prevnextPlugin(),
    highlightPlugin({
      style: function() {
        require('highlight.js/styles/github.css');
      },
      languages: ['javascript'],
    })
  ],
  paths: {
    '/': {
      path: function() {
        return require.context('./pages');
      }
    },
    blog: {
      path: function() {
        return require.context('./posts', true, /^\.\/.*\.md$/);
      },
      draft: function() {
        return require.context('./drafts', true, /^\.\/.*\.md$/);
      },
      processItem: {
        url: function(o) {
          if(o.file.url) {
            return o.file.url;
          }

          var page = o.fileName.split('.')[0].split('-').slice(2).join('-');

          return o.sectionName + '/' + page;
        },
        title: function(o) {
          return removeMd(o.file.__content.split('\n')[0]);
        },
        content: function(o) {
          return marked(o.file.__content.split('\n').slice(1).join('\n'));
        },
      },
      layout: 'blog',
      title: 'Blog posts',
    },
  },
  theme: {
    name: 'antwar-default-theme',
    navigation: [
      {title: 'Home', url: '/'},
      {title: 'Blog', url: '/blog'}
    ],
    //analyticsId: 'UA-XXX',
    customStyles: 'specific.scss'
  }
};

