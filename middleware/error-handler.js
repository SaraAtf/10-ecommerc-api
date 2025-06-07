const { StatusCodes } = require("http-status-codes");

const errorMW = (err, req, res, next) => {
	console.log("Error ", err);
	const customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "something went wrong",
	};
	return res.status(customError.statusCode).json({ msg: customError.msg });
	//return res.status(customError.statusCode).json({ err });
};

module.exports = errorMW;
