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
//@create a product
//@route GET /api/products
async function createProduct(req, res) {
  //static data just for testing purpose
  //const data = { name: "test", desc: "this is test product" };
  //the actual data from the request body
  let bodyData = "";

  req.on("data", (chunk) => (bodyData += chunk.toString()));
  req.on("end", async () => {
    // product = JSON.parse(bodyData);
    // console.log(product);
    const newProduct = await Product.createProduct(JSON.parse(bodyData));
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  });
}
//@update a product
//@route PUT /api/products
async function updateProduct(req, res, id) {
  const product = await Product.findOne(id);
  if (!product) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "product not found" }));
  } else {
    let bodyData = "";

    req.on("data", (chunk) => (bodyData += chunk.toString()));
    req.on("end", async () => {
      const bodyContent = JSON.parse(bodyData);

      const { name, desc } = bodyContent;

      const productData = {
        name: name || product.name,
        desc: desc || product.desc,
      };
      const updatedProduct = await Product.updateProduct(
        productData,
        parseInt(id)
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    });
  }
}
async function notFound(req, res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "route not found" }));
}
module.exports = {
  getProducts,
  notFound,
  getProduct,
  createProduct,
  updateProduct,
};
