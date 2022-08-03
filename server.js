const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  notFound,
} = require("./controller/productsController");
const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
  console.log("someone is checking the server");
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<h1>Hello world this is Vanilla Node web-server</h1>");
  //   res.end();
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/")[3];
    console.log(id);
    getProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else {
    notFound(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
