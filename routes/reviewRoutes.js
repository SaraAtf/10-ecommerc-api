const express = require("express");
const {
	getAllReviews,
	createReview,
	deleteReview,
	getSingleReview,
	updateReview,
} = require("../controller/reviewController");

const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);
router
	.route("/:id")
	.get(getSingleReview)
	.delete(deleteReview)
	.patch(updateReview);

module.exports = router;
