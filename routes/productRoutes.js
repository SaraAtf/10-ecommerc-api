const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	uploadImage,
	deleteProduct,
	updateProduct,
} = require("../controller/productController");

const { getSingleProductReviews } = require("../controller/reviewController");

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
router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
