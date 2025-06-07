const mongoose = require("mongoose");
const validator = require("validator");

const userSchma = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		validate: {
			validator: validator.isEmail,
			message: "Provide a valid Email",
		},
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: 6,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});
module.exports = mongoose.model("User", userSchma);
