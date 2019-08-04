const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(console.log);
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (product) {
        res.render("shop/product-detail", {
          product: product,
          pageTitle: product.title,
          path: "/products"
        });
      } else {
        return res.redirect("/");
      }
    })
    .catch(console.log);
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(console.log);
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user =>
      user.cart.items.map(item => {
        const product = item.productId;
        return {
          _id: product._id,
          title: product.title,
          quantity: item.quantity
        };
      })
    )
    .then(products =>
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products
      })
    )
    .catch(console.log);
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect("/cart");
    })
    .catch(console.log);
};

exports.postCartDeleteProduct = (req, res, next) => {
  req.user
    .removeFromCart(req.body.productId)
    .then(() => res.redirect("/cart"))
    .catch(console.log);
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders
      });
    })
    .catch(console.log);
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => {
        return {
          quantity: item.quantity,
          product: { ...item.productId._doc }
        };
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });

      return order.save();
    })
    .then(result => req.user.clearCart())
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};
