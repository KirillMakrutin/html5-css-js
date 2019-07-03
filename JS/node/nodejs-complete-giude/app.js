const express = require("express");

const app = express();
app.use((req, res, next) => {
  console.log("In the midleware");
  next();
});

app.use((req, res, next) => {
  console.log("In another midleware");
  res.send({
    name: "Kirill",
    age: 33,
    some: "json"
  });
});

app.listen(3000);
