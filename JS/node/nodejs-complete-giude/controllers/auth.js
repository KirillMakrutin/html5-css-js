const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  console.log("Is authenticated: ", req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: req.flash("error")
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        // verify pasword

        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              req.session.save(err => {
                res.redirect("/");
              });
            } else {
              req.flash("error", "Invalid email or password.");
              res.redirect("/login");
            }
          })
          .catch(err => {
            req.flash("error", "Invalid email or password.");
            res.redirect("/login");
          });
      } else {
        req.flash("error", "Invalid email or password.");
        res.redirect("/login");
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
        return bcrypt.hash(password, 12).then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: {
              items: []
            }
          });

          return user.save();
        });
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
    errorMessage: req.flash("error")
  });
};
