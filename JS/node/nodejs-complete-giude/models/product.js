const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  imageUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);
// const { getDb } = require("../util/database");
// const mongoDb = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, userId, id) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.userId = userId;
//     this._id = id ? mongoDb.ObjectId(id) : null;
//   }

//   save() {
//     return getDb()
//       .collection("products")
//       .insertOne(this);
//   }

//   update() {
//     return getDb()
//       .collection("products")
//       .updateOne({ _id: this._id }, { $set: this });
//   }

//   static fetchAll() {
//     return getDb()
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(console.log);
//   }

//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: mongoDb.ObjectId(id) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(console.log);
//   }

//   static deleteById(productId) {
//     return getDb()
//       .collection("products")
//       .deleteOne({ _id: mongoDb.ObjectId(productId) })
//       .then(result => result)
//       .catch(console.log);
//   }
// }

// module.exports = Product;
