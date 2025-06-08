require("dotenv").config();
const { Unauthonticated, BadRequest } = require("../errors");
const jwt = require("jsonwebtoken");

const authMW = (req, res, next) => {
	try {
		const authToken = req.headers.authorization;
		if (!authToken || !authToken.startsWith("Bearer ")) {
			throw new BadRequest("Provide a Valid Token");
		}

		const token = authToken.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = { userId: decoded.userId, name: decoded.name };
		next();
	} catch (error) {
		throw new Unauthonticated("Invalid Creditials");
	}
};

module.exports = authMW;
