const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	uploadImage,
	deleteProduct,
	updateProduct,
} = require("../controller/productController");

const express = require("express");
const { authorizeUser } = require("../middleware/authentication");

const router = express.Router();

router
	.route("/")
	.get(getAllProducts)
	.post(authorizeUser("admin"), createProduct);
router.route("/uploadImage").post(authorizeUser("admin"), uploadImage);
router
	.route("/:id")
	.get(getSingleProduct)
	.patch(authorizeUser("admin"), updateProduct)
	.delete(authorizeUser("admin"), deleteProduct);

module.exports = router;
