const express = require("express");
const adminRouters = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const bodyParser = require("body-parser");
const resource = require("./util/resource");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

const app = express();

app.set("view engine", "ejs");
// it's a default value for views config varibale
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resource("public")));

// register middleware to have acces to dummy user
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log);
});

// to handle all request to /admin/...
app.use("/admin", adminRouters);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// Syncronize models to the databese, create tables
sequelize
  // will drop existing table and recreate them with the relations
  //.sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Kirill", email: "admin@example.com" });
    }
    return user;
  })
  .then(user => {
    user
      .getCart()
      .then(cart => {
        if (!cart) {
          return user.createCart();
        }

        return cart;
      })
      .catch(console.log);
  })
  .then(() => {
    app.listen(3000);
  })
  .catch();
