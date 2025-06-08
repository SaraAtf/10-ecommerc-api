const { StatusCodes } = require("http-status-codes");
const userSchema = require("../model/user");
const { NotFound, BadRequest, Unauthonticated } = require("../errors");
const { attachCookiesToResponse, checkPermissions } = require("../utils");
const getAllUser = async (req, res) => {
	const users = await userSchema.find({ role: "user" }).select("-password");

	return res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
	const { id } = req.params;
	const user = await userSchema.findOne({ _id: id }).select("-password");
	if (!user) {
		throw new NotFound(`No User Founded with ${id}`);
	}
	checkPermissions(req.user, user._id);
	return res.status(200).json({ user });
};
const showCurrentUser = (req, res) => {
	return res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
	const { name, email } = req.body;

	if (!email || !email) {
		throw new BadRequest("Provide name and email");
	}
	const user = await userSchema.findByIdAndUpdate(
		{ _id: req.user.userId },
		{ name, email },
		{
			new: true,
			runValidators: true,
		}
	);
	attachCookiesToResponse(res, user);
	return res.status(200).json({ user });
};
const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if (!oldPassword || !newPassword) {
		throw new BadRequest("Provide Old password and New Password");
	}
	const user = await userSchema.findOne({ _id: req.user.userId });
	const isPasswordValid = await user.comparePassword(oldPassword);
	if (!isPasswordValid) {
		throw new Unauthonticated("Old Password is Invalid");
	}
	user.password = newPassword;
	await user.save();
	return res.status(200).json({ msg: "success! Password updated" });
};

module.exports = {
	getAllUser,
	getSingleUser,
	updateUser,
	updateUserPassword,
	showCurrentUser,
};
