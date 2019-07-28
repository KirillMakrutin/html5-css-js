const { getDb } = require("../util/database");
const mongoDb = require("mongodb");

class User {
  constructor(username, email, id) {
    this.username = username;
    this.email = email;
    this._id = id ? mongoDb.ObjectId(id) : null;
  }

  save(){
    return getDb()
      .collection("users")
      .insertOne(this);
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
