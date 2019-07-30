require("dotenv").config();
const { MongoClient } = require("mongodb");

let _db;

const uri = process.env.DB_CONN;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true });

const mongoConnect = callback => {
  client
    .connect()
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
