const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Error" });
});

app.listen(3000);
