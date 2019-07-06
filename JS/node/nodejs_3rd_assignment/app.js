const express = require("express");
const resource = require("./utils/resource");

const app = express();

app.use(express.static(resource("public")));

app.get("/users", (req, res) => {
  res.sendFile(resource("views", "users.html"));
});

app.use((req, res) => {
  res.sendfile(resource("views", "index.html"));
});

app.listen(3000);
