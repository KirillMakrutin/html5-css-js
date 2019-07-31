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
    const cartProductIndex = this.cart.items.findIndex(cartProduct => {
      console.log(cartProduct);
      return cartProduct.productId.toString() === product._id.toString();
    });

    const updateCartItems = [...this.cart.items];

    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({
        productId: new mongoDb.ObjectId(product._id),
        quantity: newQuantity
      });
    }

    const updatedCart = {
      items: updateCartItems
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
