const express = require("express");
const resource = require("../util/resource");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(resource("views", "shop.html"));
});

module.exports = router;
