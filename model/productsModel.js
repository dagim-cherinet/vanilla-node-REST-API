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
module.exports = { findAll, findOne, createProduct };
