const express = require("express");
const adminRouters = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const bodyParser = require("body-parser");
const resource = require("./util/resource");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
// it's a default value for views config varibale
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resource("public")));

// to handle all request to /admin/...
app.use("/admin", adminRouters);
app.use(shopRoutes);
app.use(errorController.get404);

// Syncronize models to the databese, create tables
sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch();
