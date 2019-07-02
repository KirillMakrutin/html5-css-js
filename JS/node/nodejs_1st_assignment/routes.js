const users = [{ username: "DummyUser1" }, { username: "DummyUser2" }];

const routes = (req, res) => {
  const url = req.url;

  switch (url) {
    case "/users":
      return usersRoute(req, res);

    case "/create-user":
      return createUserRoute(req, res);

    case "/":
      return mainRoute(req, res);

    default:
      return redirectToMainRoute(req, res);
  }
};

const mainRoute = (req, res) => {
  setCommonHeader(res);
  writeStartPage(res, "Main");

  res.write("<h1>Hello</h1>");
  res.write("<h2>Create new user</h2>");
  res.write(`<form action="/create-user" method="POST">
      <input type="text" name="username" placeholder="Username"/>
      <input type="submit" value="Add"/>
    </form>
  `);

  writeEndPage(res);
};

const redirectToMainRoute = (req, res) => {
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
};

const usersRoute = (req, res) => {
  setCommonHeader(res);
  writeStartPage(res, "Users");

  res.write("<h1>Users</h1>");
  res.write("<ul>");
  users.forEach(user => res.write(`<li>${user.username}</li>`));
  res.write("</ul>");

  res.write("<a href='/'>Go back</a>");

  writeEndPage(res);
};

const createUserRoute = (req, res) => {
  if (req.method === "POST") {
    const body = [];
    req.on("data", chunk => body.push(chunk));
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      users.push({ username: username });

      res.statusCode = 302;
      res.setHeader("Location", "/users");
      res.end();
    });
  } else {
    redirectToMainRoute(req, res);
  }
};

const setCommonHeader = res => res.setHeader("Content-Type", "text/html");

const writeStartPage = (res, title) => {
  res.write(`<html>
        <head><title>${title}</title></head>
        <body>
        `);
};

const writeEndPage = res => {
  res.write(`</body>
    </html>`);

  res.end();
};

module.exports = routes;
