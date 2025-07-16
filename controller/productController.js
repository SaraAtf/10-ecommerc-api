const { StatusCodes } = require("http-status-codes");
const productSchema = require("../model/product");
const { NotFound, BadRequest } = require("../errors");

const path = require("path");
const getAllProducts = async (req, res) => {
	const products = await productSchema.find({});

	return res.status(200).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
	const { id: productId } = req.params;
	const product = await productSchema
		.findOne({ _id: productId })
		.populate("reviews");
	if (!product) {
		throw new NotFound(`No Product Founded with this id ${productId}`);
	}

	return res.status(StatusCodes.OK).json({ product });
};
const createProduct = async (req, res) => {
	req.body.user = req.user.userId;
	console.log(req.body);
	const product = await productSchema.create(req.body);
	return res.status(StatusCodes.CREATED).json({ product });
};
const updateProduct = async (req, res) => {
	const { id: productId } = req.params;

	const product = await productSchema.findByIdAndUpdate(
		{ _id: productId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!product) {
		throw new NotFound(`No Product Founded with this id ${productId}`);
	}

	return res.status(200).json({ product });
};
const deleteProduct = async (req, res) => {
	const { id: productId } = req.params;
	const deletedProduct = await productSchema.findOne({
		_id: productId,
	});

	if (!deleteProduct) {
		throw new NotFound(`No Product Founded with this id ${productId}`);
	}

	await deletedProduct.deleteOne();
	return res
		.status(200)
		.json({ msg: "Product deleted successfully", deletedProduct });
};
const uploadImage = async (req, res) => {
	const image = req.files.image;
	if (!image) {
		throw new BadRequest("No File Provided ");
	}
	if (!image.mimetype.startsWith("image")) {
		throw new BadRequest("Provide a valid image ");
	}

	const maxSize = 1024 * 1024;
	if (image.size > maxSize) {
		throw new BadRequest("please upload an image smaller than 1 MB");
	}
	const imagePath = path.join(__dirname, "../public/uploads", image.name);
	await image.mv(imagePath);
	return res.status(StatusCodes.OK).json({ image: image.name });
};

module.exports = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
};
