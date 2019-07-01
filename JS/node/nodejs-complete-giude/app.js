const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;
  console.log("URL:", url);
  console.log("METHOD:", method);
  console.log("HEADERS:", headers);

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
        <head><title>My first Page</title></head>
        <body><h1>Hello from my Node.js</h1></body>
    </html>
  `);
  res.end();
});

server.listen(3000);
