const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader("Content-Type", "text/html");

  res.write(`
  <html>
      <head><title>Enter Message</title></head>
      <body>
      <h1>Enter Message</h1>
      <form action='/message' method='POST'>
      <input type='text' name='message'/>
      <button type='submit'>Send</button>
        </form>
      `);

  if (url === "/message" && req.method === "POST") {
    const body = [];

    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      // to String because we know that the body is string
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      res.write(`<h2>${message}</h2>`);
      res.write(`</body>
      </html>`);
    
      res.end();
    });


  }
  else
  {
    res.write(`</body>
    </html>`);
  
    res.end();
  }

});

server.listen(3000);
