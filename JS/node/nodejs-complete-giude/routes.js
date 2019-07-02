const requesthandler = (req, res) => {
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
      body.push(chunk);
    });

    req.on("end", () => {
      // to String because we know that the body is string
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      res.write(`<h2>${message}</h2>`);
      res.write(`</body>
        </html>`);

      console.log("Message parsed");

      res.end();
    });

    console.log("next line to After message parsed");
  } else {
    res.write(`</body>
      </html>`);

    res.end();
  }
};

module.exports = requesthandler;
