const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ error: "Product name is required" });
  }
  const product = await Product.findByName(name);

  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }
  await Cart.add(product);
  response.status(STATUS_CODE.OK).json({ success: true });
}

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};
