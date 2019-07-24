const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  new Product(title, price, description, imageUrl)
    .save()
    .then(result => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch(console.log);

  // sequelize automatically create associative methods
  // but alternatively we can call Product.create and assign userId

  // req.user
  //   .createProduct({
  //     title: title,
  //     imageUrl: imageUrl,
  //     price: price,
  //     description: description
  //   })
  //   .then(result => {
  //     console.log(result);
  //     res.redirect("/admin/products");
  //   })
  //   .catch(console.log);
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (product) {
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product: product
        });
      } else {
        return res.redirect("/");
      }
    })
    .catch(console.log);
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId)
    .update()
    .then(() => res.redirect("/admin/products"))
    .catch(console.log);
};

exports.getProducts = (req, res, next) => {
  //Product.findAll()
  Product.fetchAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(console.log);
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // alternative
  /* Product.findByPk(prodId)
    .then(product.destroy)
    .then(() => res.redirect("/admin/products"))
    .catch(console.log);*/

  Product.destroy({
    where: {
      id: prodId
    }
  })
    .then(() => res.redirect("/admin/products"))
    .catch(console.log);
};
