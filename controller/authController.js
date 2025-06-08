const { StatusCodes } = require("http-status-codes");
const {
	CustomErrorAPI,
	NotFound,
	BadRequest,
	Unauthorized,
} = require("../errors");
const userSchema = require("../model/user");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
	const { email } = req.body;
	const emailAlreadyExist = await userSchema.findOne({ email });
	if (emailAlreadyExist) {
		throw new CustomErrorAPI("Email Already Exist");
	}
	const isFirstUser = (await userSchema.countDocuments({})) == 0;
	req.body.role = isFirstUser ? "admin" : "user";
	const user = await userSchema.create(req.body);
	// attach user to response (create user token and attach to cookie)
	attachCookiesToResponse(res, user);
	return res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequest("Provide an email and password");
	}
	const user = await userSchema.findOne({ email });
	if (!user) {
		throw new Unauthorized(`Invalid Credentails`);
	}
	const isPasswordValid = await user.comparePassword(password);
	console.log("passwordValidation", isPasswordValid);
	if (!isPasswordValid) {
		throw new CustomErrorAPI("Password is not valid");
	}
	attachCookiesToResponse(res, user);
	return res.status(200).json({ user });
};
const logout = (req, res) => {
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	return res.status(200).json({ msg: "User logod out " });
};

module.exports = {
	login,
	logout,
	register,
};
