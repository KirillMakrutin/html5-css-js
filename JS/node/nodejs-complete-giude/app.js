const express = require("express");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const resource = require("./util/resource");
const expressHbs = require("express-handlebars");

const app = express();

// for handlebars we had to register engine name, the name we like,
// but template should have same extension, e.g. .hbs
app.engine("hbs", expressHbs());
app.set("view engine", "hbs");
// it's a default value for views config varibale
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resource("public")));

// to handle all request to /admin/...
app.use("/admin", adminData.routers);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Error", layout: false });
});

app.listen(3000);
