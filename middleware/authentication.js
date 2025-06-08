const { isTokenValid } = require("../utils");
const { Unauthonticated, Unauthorized } = require("../errors");

const authonticateUser = async (req, res, next) => {
	const token = req.signedCookies.token;
	if (!token) {
		throw new Unauthonticated("Authentication Invalid");
	}

	try {
		const { userId, name, role } = isTokenValid(token);
		req.user = { userId, name, role };
		next();
	} catch (error) {
		throw new Unauthonticated("Authentication Invalid");
	}
};

const authorizeUser = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new Unauthorized("Anauthorized to access this route");
		}
		next();
	};
};
module.exports = {
	authonticateUser,
	authorizeUser,
};
