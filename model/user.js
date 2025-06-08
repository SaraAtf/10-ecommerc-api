const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchma = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
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

userSchma.pre("save", async function () {
	const genSalt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, genSalt);
});

userSchma.methods.comparePassword = async function (userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password);
	return isMatch;
};
module.exports = mongoose.model("User", userSchma);
