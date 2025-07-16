const mongoose = require("mongoose");

const reviewSchema = require("../model/review");
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Provide a product name"],
			maxlength: [100, "name can not be more than 100 char"],
		},
		price: {
			type: Number,
			required: [true, "Provide a product price"],
			default: 0,
		},
		description: {
			type: String,
			required: [true, "Provide a product description"],
		},
		image: {
			type: String,
			default: "/uploads/example.jpg",
		},
		category: {
			type: String,
			required: [true, "Provide a product category"],
			enum: ["office", "kitchen", "bedroom"],
			default: "office",
		},
		company: {
			type: String,
			required: [true, "Provide a product company"],
			enum: {
				values: ["ikea", "liddy", "marcos"],
				message: `{VALUE} is not supported`,
			},
		},
		colors: {
			type: [String],
			default: ["#222"],
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		freeShipping: {
			type: Boolean,
			default: false,
		},
		inventory: {
			type: Number,
			required: true,
			default: 15,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "product",
	justOne: false,
});

productSchema.pre("deleteOne", async (next) => {
	await reviewSchema.deleteMany({
		product: this._id,
	});
	next();
});
module.exports = mongoose.model("Product", productSchema);
