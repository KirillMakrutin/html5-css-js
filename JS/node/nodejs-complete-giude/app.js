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
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const app = express();
const sessionStore = new MongoDbStore({
  uri: process.env.DB_CONN,
  collection: "sessions"
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
// it's a default value for views config varibale
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resource("public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);

// after session init
app.use(csrfProtection);

// register middleware to have acces to dummy user
app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(console.log);
  } else {
    next();
  }
});

// middleware to add values to every page
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
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
