const express = require("express");
const resource = require("../util/resource");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product",{
    pageTitle: "Add Product",
    path: "/admin/add-product", 
    layout: false
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routers = router;
exports.products = products;
