require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.DB_CONN;
console.log(url);

let _db;

const mongoConnect = callback => {
  MongoClient.connect(process.env.DB_CONN)
    .then(client => {
      console.log("Mongodb connected");
      //_db = client.db("shop"); defined in the .env connect url
      _db = client.db("shop");
      callback();
    })
    .catch(err => {
      console.log("Error to connect:", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
