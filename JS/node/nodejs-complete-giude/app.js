const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("this always runs");

  next();
});

app.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='product' method='POST'><input type='text' name='title'/><input type='submit' value='Save'/></form>"
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body.title);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("main");

  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
