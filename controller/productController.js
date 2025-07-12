const productSchema = require("../model/product");

const getAllProducts = (req, res) => {
	return res.status(200).json({ msg: "get All Products" });
};
const getSingleProduct = (req, res) => {
	return res.status(200).json({ msg: "get Single Product" });
};
const createProduct = (req, res) => {
	return res.status(200).json({ msg: "Create Product" });
};
const updateProduct = (req, res) => {
	return res.status(200).json({ msg: "Update Product" });
};
const deleteProduct = (req, res) => {
	return res.status(200).json({ msg: "delete Product" });
};
const uploadImage = (req, res) => {
	return res.status(200).json({ msg: "upload image" });
};

module.exports = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
};
