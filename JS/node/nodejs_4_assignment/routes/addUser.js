const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("addUser", {
    pageTitle: "Add User",
    path: "/"
  });
});

router.post("/", (req, res) => {
  users.push({ username: req.body.username });
  res.redirect("/users");
});

const users = [];

exports.addUserRouter = router;
exports.users = users;
