const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const resource = require("./util/resource");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(resource("public")));

// to handle all request to /admin/...
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(resource("views", "404.html"));
});

app.listen(3000);
