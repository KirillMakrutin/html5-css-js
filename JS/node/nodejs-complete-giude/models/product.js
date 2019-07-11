const fs = require("fs");
const resource = require("../util/resource");

const storagePath = resource("data", "products.json");

const getProductsFromFile = cb => {
  fs.readFile(storagePath, (err, fileContent) => {
    if (!err) {
      return cb(JSON.parse(fileContent));
    } else {
      return cb([]);
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);

      fs.writeFile(storagePath, JSON.stringify(products), err => {
        if (err) console.log(err);
      });
    });
  }

  // callback argument
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
