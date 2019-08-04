const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

// should be a function that this be bound to schema
userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cartProduct => {
    return cartProduct.productId.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];
  let newQuantity = 1;
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const { getDb } = require("../util/database");
// const mongoDb = require("mongodb");

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this._id = id ? mongoDb.ObjectId(id) : null;
//     this.cart = cart; // {items: []}
//   }

//   save() {
//     return getDb()
//       .collection("users")
//       .insertOne(this);
//   }

//   getCart() {
//     const db = getDb();

//     const productIds = this.cart.items.map(item => item.productId);

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(
//               item => item.productId.toString() === p._id.toString()
//             ).quantity
//           };
//         });
//       });
//   }

//   addToCart(product) {
//   }

//   deleteitemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       item => item.productId.toString() !== productId.toString()
//     );

//     const updatedCart = {
//       items: updatedCartItems
//     };

//     return getDb()
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   update() {
//     return getDb()
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: this });
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongoDb.ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongoDb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();

//     return db
//       .collection("orders")
//       .find({ "user._id": new mongoDb.ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .find({ _id: mongoDb.ObjectId(id) })
//       .next()
//       .then(user => {
//         return user;
//       })
//       .catch(console.log);
//   }
// }

// module.exports = User;
