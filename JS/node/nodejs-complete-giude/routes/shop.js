const express = require("express");
const resource = require("../util/resource");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  res.render("shop");
});

module.exports = router;
