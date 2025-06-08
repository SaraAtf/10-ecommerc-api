const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (payload) =>
	jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.LIFETIME,
	});

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

const attachCookiesToResponse = (res, user) => {
	const payload = { userId: user.id, name: user.name, role: user.role };
	const token = createJWT(payload);
	// set cookie expire date
	const expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + 1);
	// attach cookie to response
	res.cookie("token", token, {
		httpOnly: true,
		expires: expireDate,
		secure: process.env.NODE_ENV == "production",
		signed: true,
	});
};
module.exports = {
	attachCookiesToResponse,
	createJWT,
	isTokenValid,
};
