const path = require("path");

const rootDir = path.dirname(process.mainModule.filename);

const resource = function(...paths) {
  return path.join(rootDir, ...paths);
};

module.exports = resource;
