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
  const data = { name: "test", desc: "this is test product" };
  const newProduct = await Product.createProduct(data);
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newProduct));
}
async function notFound(req, res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "route not found" }));
}
module.exports = { getProducts, notFound, getProduct, createProduct };
