require("dotenv").config();
const express = require("express");
const adminRouters = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
const bodyParser = require("body-parser");
const resource = require("./util/resource");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
// it's a default value for views config varibale
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resource("public")));

// register middleware to have acces to dummy user
app.use((req, res, next) => {
  User.findOne()
    .then(user => {
      if (!user) {
        return new User({
          name: "Kirill",
          email: "kirill@test.com",
          cart: {
            items: []
          }
        }).save();
      } else {
        return user;
      }
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log);
});

// to handle all request to /admin/...
app.use("/admin", adminRouters);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(process.env.DB_CONN)
  .then(result => {
    app.listen(3000);
  })
  .catch(console.log);
