const express = require("express");
const { users } = require("./addUser");

const router = express.Router();

router.get("/users", (req, res) => {
  res.render("users", {
    pageTitle: "Users",
    path: "/users",
    users: users
  });
});

module.exports = router;
