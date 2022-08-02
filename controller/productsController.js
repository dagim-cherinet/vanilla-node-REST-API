const Product = require("../model/productsModel");

async function getProducts(req, res) {
  const products = await Product.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(products));
}
async function getProduct(req, res, id) {
  const product = await Product.findOne(id);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(product));
}
async function createProduct(req, res) {
  //static data just for testing purpose
  const data = { name: "test", desc: "this is test product" };
  //the actual data from the request body
  let bodyData = "";

  req.on("data", (chunk) => (bodyData += chunk));
  req.on("end", async () => {
    // product = JSON.parse(bodyData);
    // console.log(product);
    const newProduct = await Product.createProduct(JSON.parse(bodyData));
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  });
}
async function notFound(req, res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "route not found" }));
}
module.exports = { getProducts, notFound, getProduct, createProduct };
