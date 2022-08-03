const { v4: uuidv4 } = require("uuid");
const products = require("../data/products.json");
const saveDataToFile = require("../utils.js");
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
function findOne(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((item) => item.id == id);
    resolve(product);
  });
}
const createProduct = (product) => {
  const newProduct = { id: uuidv4(), ...product };
  return new Promise((resolve, reject) => {
    products.push(newProduct);
    saveDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
};
const updateProduct = (content, id) => {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((product) => product.id == id);
    products[index] = { id, ...content };
    saveDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
};
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    newProducts = products.filter((item) => item.id != id);
    saveDataToFile("./data/products.json", newProducts);
    resolve({ msg: "product deleted successfully" });
  });
};
module.exports = {
  findAll,
  findOne,
  createProduct,
  updateProduct,
  deleteProduct,
};
