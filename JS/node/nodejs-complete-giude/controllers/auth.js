const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log("Is authenticated: ", req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return new User({
          name: "Any",
          email: email,
          cart: {
            items: []
          }
        }).save();
      } else {
        return user;
      }
    })
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch(console.log);
};
