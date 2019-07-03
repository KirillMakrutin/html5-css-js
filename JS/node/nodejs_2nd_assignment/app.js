const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("1st middleware - runs always");
  next();
});

app.use((req, res, next) => {
  console.log("2nd middleware - runs always");
  next();
});

app.use("/users", (req, res, next) => {
  console.log("Users");
  res.send([{ username: "Mike", age: 25 }, { username: "Bob", age: 32 }]);
});

app.use("/", (req, res, next) => {
  console.log("Main");
  res.send("Hello from Express");
});

app.listen(3000);
