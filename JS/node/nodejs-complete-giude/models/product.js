const fs = require("fs");
const path = require("path");
const resource = require("../util/resource");

const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = resource("data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) console.log(err);
      });
    });
  }

  // callback argument
  static fetchAll(cb) {
    const p = resource("data", "products.json");

    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        return cb(JSON.parse(fileContent));
      } else {
        return cb([]);
      }
    });
  }
};
