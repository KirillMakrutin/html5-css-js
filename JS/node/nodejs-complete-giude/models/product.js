const { getDb } = require("../util/database");
const mongoDb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = mongoDb.ObjectId(id);
  }

  save() {
    return getDb()
      .collection("products")
      .insertOne(this);
  }

  update() {
    return getDb()
      .collection("products")
      .updateOne({ _id: this._id }, { $set: this });
  }

  static fetchAll() {
    return getDb()
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(console.log);
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: mongoDb.ObjectId(id) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(console.log);
  }
}

module.exports = Product;
