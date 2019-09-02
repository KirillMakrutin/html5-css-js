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
      if (user) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          res.redirect("/");
        });
      } else {
        res.redirect("/signup");
      }
    })
    .catch(console.log);
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  console.log("Passwords are the same:", password === confirmPassword);
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log(`${email} user already exists`);
        return res.redirect("/signup");
      } else {
        const user = new User({
          email: email,
          password: password,
          cart: {
            items: []
          }
        });

        return user.save();
      }
    })
    .then(result => {
      res.redirect("/login");
    })
    .catch(console.log);
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false
  });
};
