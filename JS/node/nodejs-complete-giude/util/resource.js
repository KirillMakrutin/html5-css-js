const path = require("path");

const rootDir = path.dirname(process.mainModule.filename);

const resource = function(...pathes) {
  return path.join(rootDir, ...pathes);
};

module.exports = resource;
