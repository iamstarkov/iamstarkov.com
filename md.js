var ramda = require('ramda');

function md2AST(content) {
  var commonmark = require('commonmark');
  var reader = new commonmark.Parser();
  return reader.parse(content);
}

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

function getTitleNode(content) {
  return getAstNode(content, isH1Node);
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

function markdown(content) {
  var commonmark = require('commonmark');
  var writer = new commonmark.HtmlRenderer();
  return writer.render(md2AST(content));
}

module.exports = {
  markdown: markdown,
  astNode2text: astNode2text,
  getTitleNode: getTitleNode,
  getTitle: ramda.compose(astNode2text, getTitleNode)
};
