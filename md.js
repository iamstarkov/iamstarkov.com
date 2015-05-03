var compose = require('ramda').compose;
var moment = require('moment');

var commonmark = require('commonmark');
var writer = new commonmark.HtmlRenderer();
var reader = new commonmark.Parser();

function ast(content) { return reader.parse(content); }
function html(content) { return htmlFromAst(ast(content)); }
function htmlFromAst(ast) { return writer.render(ast); }

function getAstNode(content, match) {
  var walker = ast(content).walker();
  var event, node;
  while (event = walker.next()) {
    node = event.node;
    if (match(event)) {
      return node;
    }
  }
}

function isH1Node(event) {
  return event.entering && event.node.type === 'Header' && event.node.level === 1;
}

function isDate(event) {
  return event.entering && event.node.literal && moment(new Date(event.node.literal)).isValid();
}

function getDateNode(content) { return getAstNode(content, isDate); }
function getTitleNode(content) { return getAstNode(content, isH1Node); }

function getDescNode(content, match) {
  var walker = ast(content).walker();
  var event, node;
  var index = 0;
  while (event = walker.next()) {
    node = event.node;
    if (node.type === 'Paragraph') {
      index++;
    }

    if (node.type === 'Paragraph' && index === 3) {
      return node;
    }
  }
}


function text(astNode) {
  var walker = astNode.walker();
  var acc = '';
  var event, node;
  while (event = walker.next()) {
    node = event.node;
    if (node.literal) {
      acc += node.literal;
    }
  }
  return acc;
}



module.exports = {
  html: html,
  text: text,
  getTitleNode: getTitleNode,
  getDesc: compose(htmlFromAst, getDescNode),
  getDescText: compose(text, getDescNode),
  getTitle: compose(text, getTitleNode),
  getDate: compose(text, getDateNode),
  getHumanDate: compose(text, getDateNode)
};
