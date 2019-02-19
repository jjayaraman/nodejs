const http = require("http");

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("Hello..");
  } catch (error) {
    console.error('Error :: ', error);
  }
});

server.listen(PORT, HOST, () => {
    console.log(`Server up and listening on port http://${HOST}:${PORT}`);
});
