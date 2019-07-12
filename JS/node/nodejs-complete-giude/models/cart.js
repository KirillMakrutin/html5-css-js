const fs = require("fs");
const resource = require("../util/resource");

const cartPath = resource("data", "cart.json");

module.exports = class Cart {
  constructor() {
    this.product = [];
    this.totalPrice = 0;
  }

  static addProduct(product) {
    // fetch the previous cart

    fs.readFile(cartPath, (err, cartFileContent) => {
      let cart = {
        products: [],
        totalPrice: 0
      };

      if (!err) {
        cart = JSON.parse(cartFileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        prod => product.id === prod.id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: product.id,
          title: product.title,
          qty: 1
        };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += +product.price;

      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
          console.log(err);
        }
      });
    });

    // Analyze the cart => Find existing product
    // Add new product or increas quantity
  }
};
