const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("this always runs");

  next();
});

app.use("/json", (req, res, next) => {
  console.log("json");

  res.send({
    name: "Kirill",
    age: 33,
    some: "json"
  });
});

app.use("/", (req, res, next) => {
  console.log("main");

  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
