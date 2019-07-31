const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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
    .getCart()
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
  const prodId = req.body.productId;

  req.user
    .deleteitemFromCart(prodId)
    .then(() => res.redirect("/cart"))
    .catch(console.log);
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
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
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = {
                quantity: product.cartItem.quantity
              };
              return product;
            })
          );
        })
        .catch(console.log);
    })
    .then(() => fetchedCart.setProducts(null))
    .then(() => res.redirect("/orders"))
    .catch(console.log);
};
