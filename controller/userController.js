const { StatusCodes } = require("http-status-codes");
const userSchema = require("../model/user");
const { NotFound } = require("../errors");

const getAllUser = async (req, res) => {
	console.log("User", req.user);
	const users = await userSchema.find({ role: "user" }).select("-password");

	return res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
	const { id } = req.params;
	const user = await userSchema.findOne({ _id: id }).select("-password");
	if (!user) {
		throw new NotFound(`No User Founded with ${id}`);
	}
	return res.status(200).json({ user });
};
const showCurrentUser = (req, res) => {
	return res.status(200).json({ msg: "Get Current User" });
};
const updateUser = (req, res) => {
	return res.status(200).json({ msg: "update User" });
};
const updateUserPassword = (req, res) => {
	return res.status(200).json({ msg: "update User Password" });
};

module.exports = {
	getAllUser,
	getSingleUser,
	updateUser,
	updateUserPassword,
	showCurrentUser,
};
