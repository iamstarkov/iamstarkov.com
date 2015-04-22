var path = require('path');

module.exports = function basename(file) {
  return path.basename(file.relative, path.extname(file.relative));
}
