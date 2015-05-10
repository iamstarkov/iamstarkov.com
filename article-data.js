var md = require('commonmark-helpers');
var moment = require('moment');

function isDate(event) {
  if (!md.isEntering(event) || !md.literal(event)) {
    return;
  }
  return moment(new Date(md.literal(event))).isValid();
}

function containOnlyImage(event) {
  var img = md.match(md.node(event), isImage);
  if (img) {
    return md.text(img) === md.text(md.node(event));
  }
}

function isDesc() {
  var dateFound;
  return function(event) {
    if (!md.isEntering(event)) { return; }
    if (isDate(event)) { dateFound = true; }
    return dateFound && !containOnlyImage(event) && !isDate(event) && md.isParagraph(event);
  };
}

function isImage(event) { return md.isEntering(event) && md.isImage(event); }

module.exports = function(content) {
  return {
    title: md.text(md.match(content, md.isHeader)),
    image: (md.match(content, isImage) || { destination: null }).destination,
    desc: md.text(md.match(content, isDesc())),
    descHtml: md.html(md.match(content, isDesc())),
    date: md.text(md.match(content, isDate)),
    content: md.html(content),
  };
};
