const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://kmakrutin:hbGmzAKmL2vtN6Q@node-complete-cqjbx.gcp.mongodb.net/test?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("Mongodb connected");
      callback(client);
    })
    .catch(console.log);
};

module.exports = mongoConnect;
