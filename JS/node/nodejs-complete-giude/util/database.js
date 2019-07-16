require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(process.env.DB_CONN)
    .then(client => {
      console.log("Mongodb connected");
      callback(client);
    })
    .catch(console.log);
};

module.exports = mongoConnect;
