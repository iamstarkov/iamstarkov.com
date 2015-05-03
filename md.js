var compose = require('ramda').compose;
var moment = require('moment');

var commonmark = require('commonmark');
var writer = new commonmark.HtmlRenderer();
var reader = new commonmark.Parser();

function md2AST(content) { return reader.parse(content); }
function markdown(content) { return writer.render(md2AST(content)); }
function markdownFromAst(ast) { return writer.render(ast); }

function getAstNode(content, match) {
  var walker = md2AST(content).walker();
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

function getDateNode(content) {
  return getAstNode(content, isDate);
}

function getTitleNode(content) {
  return getAstNode(content, isH1Node);
}

function getDescNode(content, match) {
  var walker = md2AST(content).walker();
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


function astNode2text(astNode) {
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



function text2unix(text) {
  return moment(new Date(text)).unix();
}

module.exports = {
  markdown: markdown,
  astNode2text: astNode2text,
  getTitleNode: getTitleNode,
  getDesc: compose(markdownFromAst, getDescNode),
  getTitle: compose(astNode2text, getTitleNode),
  getPublishedAt: compose(astNode2text, getDateNode),
  getPublishedAtInUnix: compose(text2unix, astNode2text, getDateNode)
};
