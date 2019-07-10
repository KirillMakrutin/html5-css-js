const express = require("express");
const resource = require("../util/resource");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "My Shop",
    path: "/",
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
