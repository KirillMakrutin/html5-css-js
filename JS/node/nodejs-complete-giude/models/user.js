const { getDb } = require("../util/database");
const mongoDb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this._id = id ? mongoDb.ObjectId(id) : null;
    this.cart = cart; // {items: []}
  }

  save() {
    return getDb()
      .collection("users")
      .insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });

    const updatedCart = {
      items: [{ productId: new mongoDb.ObjectId(product._id), quantity: 1 }]
    };
    return getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  update() {
    return getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: this });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: mongoDb.ObjectId(id) })
      .next()
      .then(user => {
        return user;
      })
      .catch(console.log);
  }
}

module.exports = User;
