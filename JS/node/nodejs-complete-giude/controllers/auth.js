require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const nodemailer = require("nodemailer");
// const sendGridTransport = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(
//   sendGridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY
//     }
//   })
// );

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

      // return transporter.sendMail({
      //   to: email,
      //   from: "shop@node-complete-guide.com",
      //   subject: "Singup succeeded!",
      //   html: "<h1>Welcome on board!</h1>"
      // });
      console.log("Sending email to: ", email);
      const msg = {
        to: email,
        from: "shop@node-complete.com",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
      };

      return sgMail.send(msg);
    })
    .then(result => console.log("The email has been sent"))
    .catch(console.log);
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: req.flash("error")
  });
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset password",
    errorMessage: req.flash("error")
  });
};

exports.postReset = (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      req.flash("error", "Cannot reset password.");
      return res.redirect("/reset");
    } else {
      const token = buffer.toString("hex");
      User.findOne({ email: email })
        .then(userDoc => {
          if (!userDoc) {
            req.flash("error", "No account with the email.");
            return res.redirect("/reset");
          } else {
            console.log("Reseting password for user", userDoc);

            userDoc.resetToken = token;
            userDoc.resetTokenExpiration = Date.now() + 3600;

            return userDoc
              .save()
              .then(result => {
                res.redirect("/login");

                // return transporter.sendMail({
                //   to: email,
                //   from: "shop@node-complete-guide.com",
                //   subject: "Singup succeeded!",
                //   html: "<h1>Welcome on board!</h1>"
                // });
                console.log("Sending email to: ", email);
                const msg = {
                  to: email,
                  from: "shop@node-complete.com",
                  subject: "Password reset",
                  html: `
                <p>You requested password reset</p>
                <p>Clicl this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                `
                };

                console.log("Sending message: ", msg);

                return sgMail.send(msg);
              })
              .then(result => console.log("The email has been sent"))
              .catch(console.log);
          }
        })
        .catch(console.log);
    }
  });
};
