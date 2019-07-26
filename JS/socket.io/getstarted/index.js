const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  socket.broadcast.emit("chat message", "hi");

  socket.on("chat message", function(msg) {
    // send to  everyone 
    // io.emit("chat message", msg);
    
    // send to everyone except sender
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on localhost:3000");
});
