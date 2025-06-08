const { isTokenValid } = require("../utils");
const { Unauthonticated } = require("../errors");

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

module.exports = authonticateUser;
