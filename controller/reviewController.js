const { StatusCodes } = require("http-status-codes");
const reviewSchema = require("../model/review");
const productSchema = require("../model/product");
const { NotFound, BadRequest } = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

const createReview = async (req, res) => {
	const { product: productId } = req.body;

	const isValidProduct = await productSchema.findOne({
		_id: productId,
	});

	if (!isValidProduct) {
		throw new NotFound(`No Product Founded with ${productId}`);
	}

	const isAlreadySubmitted = await reviewSchema.findOne({
		product: productId,
		user: req.user.userId,
	});
	if (isAlreadySubmitted) {
		throw new BadRequest("You Already Submitted one Review Before");
	}
	req.body.user = req.user.userId;

	const review = await reviewSchema.create(req.body);

	res.status(StatusCodes.OK).json({ review });
};
const getAllReviews = async (req, res) => {
	const reviews = await reviewSchema
		.find({})
		.populate({
			path: "product",
			select: "name company price",
		})
		.populate({
			path: "user",
			select: "name",
		});
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const review = await reviewSchema
		.findOne({ _id: reviewId })
		.populate({
			path: "product",
			select: "name company price",
		})
		.populate({
			path: "user",
			select: "name",
		});
	if (!review) {
		throw new NotFound(`No Review Founded with ${reviewId}`);
	}
	res.status(StatusCodes.OK).json({ review });
};
const updateReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const { title, comment, rating } = req.body;
	if (!title || !comment || !rating) {
		throw new BadRequest("Provide title , comment ,product and rating values");
	}

	const review = await reviewSchema.findOne({
		_id: reviewId,
		user: req.user.userId,
	});

	if (!review) {
		throw new NotFound(`No review founded with ${reviewId}`);
	}

	checkPermissions(req.user, review.user);
	// update
	review.title = title;
	review.comment = comment;
	review.rating = rating;

	await review.save();

	res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const review = await reviewSchema.findOne({ _id: reviewId });
	if (!review) {
		throw new NotFound(`No Review Founded with ${reviewId}`);
	}

	checkPermissions(req.user, review.user);

	await review.deleteOne();
	res.status(StatusCodes.OK).json({ msg: "Review Deleted Success Fully" });
};

const getSingleProductReviews = async (req, res) => {
	const { id: productId } = req.params;
	const reviews = await reviewSchema.find({ product: productId });
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
module.exports = {
	getAllReviews,
	getSingleReview,
	createReview,
	updateReview,
	deleteReview,
	getSingleProductReviews,
};
