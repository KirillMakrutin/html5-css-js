module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("Not authenticated");
    return res.redirect("/login");
  }

  console.log("Authenticated - passing next()");
  next();
};
